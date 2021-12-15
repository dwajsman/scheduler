import React from 'react'

let interviewers = 	{"1":{"id":1,"name":"Sylvia Palmer","avatar":"https://i.imgur.com/LpaY82x.png"},"2":{"id":2,"name":"Tori Malcolm","avatar":"https://i.imgur.com/Nmx0Qxo.png"},"3":{"id":3,"name":"Mildred Nazir","avatar":"https://i.imgur.com/T2WwVfS.png"},"4":{"id":4,"name":"Cohana Roy","avatar":"https://i.imgur.com/FK8V841.jpg"},"5":{"id":5,"name":"Sven Jones","avatar":"https://i.imgur.com/twYrpay.jpg"},"6":{"id":6,"name":"Susan Reynolds","avatar":"https://i.imgur.com/TdOAdde.jpg"},"7":{"id":7,"name":"Alec Quon","avatar":"https://i.imgur.com/3tVgsra.jpg"},"8":{"id":8,"name":"Viktor Jain","avatar":"https://i.imgur.com/iHq8K8Z.jpg"},"9":{"id":9,"name":"Lindsay Chu","avatar":"https://i.imgur.com/nPywAp1.jpg"},"10":{"id":10,"name":"Samantha Stanic","avatar":"https://i.imgur.com/okB9WKC.jpg"}}




export default function Show(props) {
  
  
  if(!props.interviewer){
    return
  }
  
  console.log(props.interview)

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interview}</h3> 

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
