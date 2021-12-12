import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import Button from 'components/Button';
import DayListItem from 'components/DayListItem';
import DayList from 'components/DayList';
import Appointment from "components/Appointment/index";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
  
];


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// API INFO
// "GET_DAYS":         http://localhost:8001/api/days,
// "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
// "GET_INTERVIEWERS": http://localhost:8001/api/interviewers,

export default function Application(props) {
  
  // const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
      .then((res) => {
        setDays([...res.data])
      })

  }, [])

  const appointmentsArr = appointments.map((appointmentItem) =>  
      <Appointment {...appointmentItem} key={appointmentItem.id}  />
  )


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
            days={days}
            value={days}
            onChange={setDays}
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
      {appointmentsArr}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
