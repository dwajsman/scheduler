export const getAppointmentsForDay = function(state, day) {

  let result = []

  state.days.forEach(item => {

    if (item.name === day) {
      item.appointments.forEach(appointment => {
        // const parsedAppointment = 
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
  return result;
};



export const getInterviewersForDay = function(state, day) {

  let result = []

  if (state.days.length === 0){
    // console.log("zero")
    return [];
  }

  state.days.forEach(item => {
    if (item.name === day) {
      item.appointments.forEach(appointment => {
        if (state.appointments[appointment].interview) {

          const myInterviewer = state.appointments[appointment].interview.interviewer;
          result.push(myInterviewer)     
          
        } else {
          result.push(null)
        }
      });
    };

  });

  return result;
};




export const getInterview = function(state, interview){

  if (!interview) {
    return null;
  }
  
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return result;


}