import React, { Fragment } from 'react'
import "./styles.scss";
import Header from './Header';
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Appointment(props) {
  // console.log("props",props, props.interview, props.time)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  function deleteConf(id) {
    transition(DELETING);    
  }

  function del(id) {
    transition(SAVING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show {...props.interview}/> : <Empty/> } */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={deleteConf}
          />)
      }
      {mode === SAVING && <Status message={"Updating"} />}
      
      {mode === CREATE &&  <Form interviewers={interviewers} onCancel={() => back()} onSave={save} /> }
      {mode === DELETING && <Confirm message={`Delete?`} 
        onCancel={() => back()} onConfirm={() => {del(props.id)}} />}
      {/* {mode === SAVE &&  <Form interviewers={[]} onCancel={() => back()} onSave={props.bookInterview("YES", props.interview)}/> } */}
    </article>
  )
}

