import React from 'react';
import ReactDOM from 'react-dom';



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
function AvailableTable(props){
    //return (<table></table>);
}

*/

/*
 * Given props.rowData, return a <tr> filled with <td> from rowData
 *
*/

/*
function TableHeader(props){
	return( <tr>
			props.headerData.map(function(data,idx){
				return <th key={idx}>{data}</th>;
			})
			</tr>
		);
}
*/


class TakenTable extends React.Component{
    render(){
        return(
            <table>
                <thead>
                    <TakenTableHeader h1="TITLE" h2="GRADE" h3="DEPARTMENT"/>

                </thead>
                <tbody>
                    
             </table>
        );
    }
}


class TakenTableRow extends React.Component{
    render(){
        var courseTitle = this.props.ct;
        var courseGrade = this.props.cg;
        var courseDepartment = this.props.cd;
        return( <tr>
                <td>{courseTitle}</td>
                <td>{courseGrade}</td>
                <td>{courseDepartment}</td>
                </tr>
              );
     }
            
}

class TakenTableHeader extends React.Component{
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
ReactDOM.render(<TakenTable />,app);

