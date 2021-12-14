import React from 'react'


// // cancelInterview

//   import "./styles.scss";
// import Header from './Header';
// import Empty from "./Empty";

// import Form from "./Form";
// import Status from "./Status";


// import useVisualMode from "../../hooks/useVisualMode"

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";
// const SAVING = "SAVING";






export default function Show(props) {

  // const { transition } = useVisualMode(
  //   props.interview ? SHOW : EMPTY
  // );


  // function del() {
  //   transition(SAVING);
  //   props.cancelInterview(props.id)
  //     .then(() => transition(SHOW))
  // }



  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
            
          />
        </section>
      </section>
    </main>
  )
}
