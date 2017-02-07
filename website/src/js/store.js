
/*
 * action types
 */

export const CHANGE_STUDENT = 'CHANGE_STUDENT';



/*
 * action creators
 */

export function changeStudent(studentName){
    return {
        type: CHANGE_STUDENT,
        name:studentName
    };


}






/*
 * LOAD IN MOCK JSON DATA
 */
var student_data = require('./student_data.json');

/*
 * initial state
 */
const initialState = {
    displayStudent: '',
    displayStudentCourses: [],
    allStudents: student_data 
}





/*
 * reducers
 */


export function courseApp(state = initialState,action){
    switch(action.type){
        case CHANGE_STUDENT:
           // find student in state.allstudents
           var obj = state.allStudents.find(s => s.student_name===action.name);
           var newDisplay = [];
           if(obj !=undefined){
               newDisplay = obj.completed_courses;
           }
            return Object.assign({},state,{
                displayStudent: action.name,
                displayStudentCourses:newDisplay
            }
            );
    default:
            console.log("yo");
            return state;

    }

    // return init state
    return state;
}



