import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import Button from 'components/Button';
import DayListItem from 'components/DayListItem';
import DayList from 'components/DayList';
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import { cleanup } from "@testing-library/react";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
  
// ];



// API INFO
// "GET_DAYS":         http://localhost:8001/api/days,
// "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
// "GET_INTERVIEWERS": http://localhost:8001/api/interviewers,

export default function Application(props) {
  
  // const [day, setDay] = setState(prev => ({ ...prev, day }));
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer:{}
  });
  
  



  //const [days, setDays] = setState(prev => ({ ...prev, days }));
  
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





    // axios.get(`http://localhost:8001/api/days`)
    // .then((res) => {
    //   setDays([...res.data])
    // })
    
    // }, [])
  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });
  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  // const appointmentsArr = dailyAppointments.map((appointmentItem) =>  
  // <Appointment {...appointmentItem} key={appointmentItem.id}  />
  // )


  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
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