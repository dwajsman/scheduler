import { useState, useEffect } from "react";

import axios from "axios";

// import { getAppointmentsForDay } from "../helpers/selectors";
//   const interview = getInterview(state, appointment.interview);  // DEL??
//   const appointments = getAppointmentsForDay(state, state.day);  // USED 
//   const interviewers = getInterviewersForDay(state, state.day);  // DEL??

// import Application from "../components/Application";


export default function useApplicationData(props) {
  
  // LG - Connect to DB
  useEffect(() => {
   
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    });

  },[])
  

  // LG state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  

  // LG setDay  
  const setDay = day => setState({ ...state, day });

  // REVIEW RETUN PART ***
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = [ ...state.days]
    const dayID = state.days.findIndex( day => day.appointments.includes(id))
    
    console.log("dayID", dayID)
    days[dayID].spots = spotsRemaining(dayID, appointments);

      return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments, days });
      })
  }


  const editInterview = function(id, interview) {
    // console.log("editInterview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({ ...state, appointments });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments });
      })

  }
 

  const cancelInterview = function(id) {
    // console.log("editInterview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [ ...state.days]
    const dayID = state.days.findIndex( day => day.appointments.includes(id))

    // console.log(days[dayID])
    days[dayID].spots = spotsRemaining(dayID, appointments);

    // setState({ ...state, appointments });
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments, days });
      })
  }


  const spotsRemaining = function (dayID, appointments){

    // for (let index = 0; index < state.days.length; index++) {
      const myDay = state.days[dayID];  

      let sumOfNullSpots = 0;

      myDay["appointments"].forEach(interviewID => {
        if (appointments[interviewID]["interview"] === null) {
          sumOfNullSpots++
        }
      });
      
      return sumOfNullSpots
      
    // }



    
  }


  return { state, setDay, bookInterview, cancelInterview, editInterview }
  
} // END of useApplicationData`