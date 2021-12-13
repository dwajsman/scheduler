export const getAppointmentsForDay = function(state, day) {

  let result = []

  state.days.forEach(item => {

    if (item.name === day) {
      item.appointments.forEach(appointment => {
        // if (appointment === state.appointments[appointment].id) {
          // if (!state.appointments[appointment].interview){
          //   result.push (null) 
          // } else

          // console.log(state.appointments[appointment])
          result.push(state.appointments[appointment])   
          // }     
        // }
      });
    }
    
  });
  // if (result.length === 0) {return};
  // console.log("result", result)
  return result;
};



export const getInterview = function(state, interview){
  // console.log("input", interview)

  if (!interview) {
    return null;
  }

  // console.log("getInterview", state.interviewers, interview.student)
  // console.log(state.interviewers[interview.interviewer])
  

  //state.interviewers[interview.interviewer];
  
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  // console.log("result", result)
  return result;


}