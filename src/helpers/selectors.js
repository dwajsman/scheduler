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

          result.push(state.appointments[appointment])   

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
        
          const myInterviewer = state.appointments[appointment].interview.interviewer;
          result.push(myInterviewer)     
        
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