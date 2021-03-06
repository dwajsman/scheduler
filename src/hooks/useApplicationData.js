import { useState, useEffect } from "react";

import axios from "axios";


export default function useApplicationData(props) {
  
  // API request 
  useEffect(() => {
   
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      const [first, second, third] = all;

      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    }).catch((err) => console.log(err.message));

  },[])
  
  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  


  // used by DayList component
  const setDay = day => setState({ ...state, day });


  // function to book interviews 
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
    

    days[dayID].spots = spotsRemaining(dayID, appointments);

      return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
      })
      .catch((err) => console.log(err.message));


  }


  // function to cancel interview
  const cancelInterview = function(id) {

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


    days[dayID].spots = spotsRemaining(dayID, appointments);


    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments, days });
      })
      .catch((err) => console.log(err.message));


  }

  // count null interview spots (empty spots)
  const spotsRemaining = function (dayID, appointments){


      const myDay = state.days[dayID];  

      let sumOfNullSpots = 0;

      myDay["appointments"].forEach(interviewID => {
        if (appointments[interviewID]["interview"] === null) {
          sumOfNullSpots++
        }
      });
      
      return sumOfNullSpots
      
    
  }


  return { state, setDay, bookInterview, cancelInterview }
  
} // END of useApplicationData