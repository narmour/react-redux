import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {courseApp} from './store';
import {changeStudent} from './store';




/*
 * LOAD IN MOCK JSON DATA
 */
var class_data = require('./class_data.json');


/*
 * CREATE STORE
 */

var store = createStore(courseApp);





/*
 * Given completed_courses list, return array of classes with prereqs met and not taken already
 */

function availCourses(completed_courses){


    // return array
    var ret = [];



    console.log(completed_courses);

    // for each class in class_data,
    class_data.forEach(function(course){
        //if course not in completed_courses or ret array,  check for prereqs
        if(completed_courses.findIndex(c => c.course ===course.title) ==-1){
            console.log("NOT COMPLETED: " + course.title);
            var met = true;
            course.prereqs.forEach(function(p){
                // if prereq not in completed_courses, prereqs not met
                if(completed_courses.findIndex(c =>c.course ===p) ==-1){
                    console.log("didnt find " + p+ "for " + course.title);
                    met = false;
                }
            });
        }
            //if prereqs are met and its not in return list, add it to return list
            if(met && ret.findIndex(x=> x.title===course.title) ==-1)
                    ret.push(course);

    });


    return ret;


}

class Input extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            displayCourses: [],
            availCourses: []
        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({name: event.target.value});
    }

    handleSubmit(event){
        store.dispatch(changeStudent(this.state.name));
        this.setState({
            displayCourses: store.getState().displayStudentCourses,
            availCourses: availCourses(store.getState().displayStudentCourses)
        });
        event.preventDefault();
    }



    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input type="text" value = {this.state.name} onChange = {this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
                    
            <TakenTable data={this.state.displayCourses} />
            <AvailableTable data={this.state.availCourses} />
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

