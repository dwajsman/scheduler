
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


// returns list of interviewers available for a day
export const getInterviewersForDay = (state, day) => {
  if (state.days.length === 0){
    return [];
  }
  
  const selectedDay = state.days.find(
    (appointment) => appointment.name === day
  );

  return selectedDay.interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId];
  });
};

// returns interview info with interviewer info instead of ID 
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