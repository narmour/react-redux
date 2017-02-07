import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {courseApp} from './store';



/*
 *
 * CourseFinder -  contains input box, courses taken table,available courses table
 * InputBar - Receives user input
 * TakenTable - table listing completed courses based on user input name
 * AvailableTable- table listing all avaialble courses based on user input name
 * TableHeader - functional component returns header for our two tables
 * TableRow - functional component returns a row with td for our tables
 */













/*
 * LOAD IN MOCK JSON DATA
 */
var student_data = require('./student_data.json');
var class_data = require('./class_data.json');


/*
 * CREATE STORE
 */

var store = createStore(courseApp);
console.log(store.getState());





/*
 * Given completed_courses list, return array of classes with prereqs met and not taken already
 */

function availCourses(completed_courses){

    // return array
    var ret = [];

    // for each class in class_data,
    class_data.forEach(function(course){
        //if course not in completed_courses or ret array,  check for prereqs
        if(completed_courses.findIndex(c => c.course ===course.title) ==-1){
            course.prereqs.forEach(function(p){
                var preReqs = true;
                // if prereq not in completed_courses, prereqs not met
                if(completed_courses.findIndex(c =>c.course ===p) ==-1){
                    preReqs = false;
                }
                //if prereqs are met and its not in return list, add it to return list
                if(preReqs && ret.findIndex(x=> x.title===course.title) ==-1){
                    ret.push(course);
                }
                // reset preReq bool.
                preReqs = true;
            });

        }
    });

    console.log(ret);

    return ret;


}

class Input extends React.Component{

    constructor(props){
        super(props);
        this.studentUpdate = this.studentUpdate.bind(this);
    }



    render() {
        return (
        <div>
            <em>Enter Name</em><br></br>
            <input type ="text" name="input" value=" " />
            <input type ="submit" name="nameButton" value="StudentSearch" onClick = {this.studentUpdate()}/>
            <TakenTable data={student_data[0]["completed_courses"]} />
            <AvailableTable data={availCourses(student_data[0]["completed_courses"])} />
        </div>
        
        );
    }

    studentUpdate(){
        //console.log(window.document.getElementById("input").value);
    }








}

class AvailableTable extends React.Component{
    render(){
        return(
                <table>
                    <thead>
                        <TableHeader h1="TITLE" h2 = "DEPARTMENT" h3="TYPE" />
                    </thead>
                    <tbody>
                    {this.props.data.map(function(availCourse){
                        return <TableRow d1={availCourse.title} d2={availCourse.department} d3={availCourse.type} />;
                        
                    })
                    }    
                    </tbody>
                    </table>
                        



        );
    }
}

class TakenTable extends React.Component{
    render(){
        return(
            <table>
                <thead>
                    <TableHeader h1="TITLE" h2="GRADE" h3="DEPARTMENT"/>

                </thead>
                <tbody>
                    {this.props.data.map(function(course){
                        return <TableRow d1={course.course} d2={course.grade} d3={course.department} />;

                    })
                    }
                </tbody>
                    
             </table>
        );
    }
}


class TableRow extends React.Component{
    render(){
        var d1 = this.props.d1;
        var d2 = this.props.d2;
        var d3 = this.props.d3;
        return( <tr>
                <td>{d1}</td>
                <td>{d2}</td>
                <td>{d3}</td>
                </tr>
              );
     }
            
}

class TableHeader extends React.Component{
    render(){
        var header1 = this.props.h1;
        var header2 = this.props.h2;
        var header3 = this.props.h3;
        return (<tr>
                <th>{header1}</th>
                <th>{header2}</th>
                <th>{header3}</th>
                </tr>
               );
    }
}



const app = document.getElementById("app");
ReactDOM.render(<Input />,app);

