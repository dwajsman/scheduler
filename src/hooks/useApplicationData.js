// IN THIS FILE
// {state, setDay, bookInterview, cancelInterview} editInterview???
import React, { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay } from "../helpers/selectors";
//   const interview = getInterview(state, appointment.interview);  // DEL??
//   const appointments = getAppointmentsForDay(state, state.day);  // USED 
//   const interviewers = getInterviewersForDay(state, state.day);  // DEL??

import Application from "../components/Application";


export default function useApplicationData() {
  
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
    interviewer:{}
  });
  
  // LG setDay  
  const setDay = day => setState({ ...state, day });

  // REVIEW RETUN PART ***
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
      return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments });
      })
  }


  function editInterview(id, interview) {
    console.log("editInterview", id, interview);
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


  const appointments = getAppointmentsForDay(state, state.day);  // USED 

  // TEST AGAIN *** 
  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`,)
    .then((res) => {
        setState({ ...state, appointments });
    })
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview }
} // END of useApplicationData

