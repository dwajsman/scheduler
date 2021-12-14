import React, { Fragment } from 'react'
import "./styles.scss";
import Header from './Header';
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  // console.log("props",props, props.interview, props.time)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  




  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show {...props.interview}/> : <Empty/> } */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />)
      }
      {mode === CREATE &&  <Form interviewers={[]} onCancel={() => back()} /> }
    </article>
          )
}

