
/*
 * action types
 */
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_STUDENT = 'ADD_STUDENT';




/*
 * action creators
 */
export function addCourse(courseName,courseGrade,courseDepartment){
    return {
        type: ADD_COURSE,
        course:courseName,
        grade: courseGrade,
        department:courseDepartment
    };
}


export function addStudent(studentName){
    return {
        type: ADD_STUDENT,
        student_name: studentName,
        completed_courses: []
    };
}





/*
 * initial state
 */

const initialState = {
    displayStudent: 'NONE',
    displayStudentCourses: [],
    allStudents: [] 
}





/*
 * reducers
 */


export function courseApp(state = initialState,action){
    switch(action.type){
        case ADD_STUDENT:
            return Object.assign({},state,{
                displayStudent: action.student_name,
                displayStudentCourses: [],
                allStudents: [
                    ...state.allStudents,
                    {
                        student_name: action.student_name,
                        completed_courses: []
                    }
                ]
                }
                );
         case ADD_COURSE:
            var updatedCourses = [
                ...state.displayStudentCourses,
                {
                    course: action.course,
                    grade: action.grade, 
                    department: action.department
                }
            ];
                
            return Object.assign({},state,displayStudentCourses: updatedCourses,
                    allStudents[state.displayStudent].completed_courses = updatedCourses);

         default:
            return state;

        }
    // return init state
    return state;
}



