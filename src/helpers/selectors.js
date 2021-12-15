export const getAppointmentsForDay = function(state, day) {

  let result = []

  const selectedDay = state.days.find(
    (appointment) => appointment.name === day
  );

  if (!selectedDay) {
    return result;
  }

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
    return result;
  }

  state.days.forEach(item => {
    if (item.name === day) {
      item.appointments.forEach(appointment => {
        if (state.appointments[appointment].interview) {
        // if (appointment.id === state.interviewers.id) {

          const myInterviewer = state.appointments[appointment].interview.interviewer;
          result.push(myInterviewer)     
          // result.push(state.interviewers[appointment]);
          
        } else {
          result.push(null)
        }
      });
    }

  });

  return result;
};




export const getInterview = function(state, interview){

  if (!interview) {
    return null;
  }
  
  const result = {
    ...interview,
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return result;


}