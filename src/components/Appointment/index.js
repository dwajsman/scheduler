import React from 'react'
import "./styles.scss";


// manages states of the Appointment component
import Header from './Header';
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // runs after SAVE button is clicked
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    transition(SAVING);
    
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

   // runs when EDIT button is clicked
  function edit(id, name, interviewer) {
    const interview = {
      // id: id,
      student: name,
      interviewer: interviewer

    };
    transition(EDIT);
    props.bookInterview(props.id, interview)
      .then(() => transition(EDIT))
      .catch(() => transition(ERROR_SAVE, true));

  }

  // runs when DELETE button is pressed
  function deleteConf(id, interview) {
    transition(CONFIRM);
  }

  // runs when user CONFIRMS deletion 
  function del(id, name, interviewer) {
  
    transition(SAVING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={deleteConf}
            onEdit={edit}
          />)
      }
      {mode === SAVING && <Status message={"Updating"} />}
      
      {mode === CREATE &&  <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} /> }
      {mode === CONFIRM && ( 
          <Confirm 
            message={"Delete?"} 
            onCancel={() => transition(SHOW)}
            onConfirm={() => {del(props.id, props.interview)}} 
          /> )}
      {mode === EDIT && (
          <Form 
            student={props.interview.student}
            interviewers={props.interviewers} 
            interviewer={props.interview.interviewer.id}
            onCancel={() => back()} 
            onSave={save} 
          />)
      }
      {mode === ERROR_SAVE && (
          <Error 
            message={"Could not save appointment"} 
            onClose={() => transition(EMPTY)}
          />)
      } 

      {mode === ERROR_DELETE && (
          <Error 
            message={"Could not delete appointment"} 
            onClose={() =>  transition(SHOW)}
          />)
      }       
    </article>
  )
}

