import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import Button from 'components/Button';
import DayListItem from 'components/DayListItem';
import DayList from 'components/DayList';
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { cleanup } from "@testing-library/react";


export default function Application(props) {
  
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer:{}
  });
  

  function bookInterview(id, interview) {
    // console.log("line 25", id, interview);
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
      .catch((err) => {
        console.log(err);
      });
  }


  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`,)
      // .then((res) => {
      //   setState({ ...state, appointments });
      // })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
   
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [first, second, third] = all;
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    });

  },[]);


  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });


  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
       
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
          
        </nav>
         <form method="POST" action="">


        </form>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}