import React, { useState } from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];



export default function InterviewerListItem(props) {

  // const [value, setInterviewer] = useState(props.id)

  const interviewerClass = classNames("interviewers__item", {
                      "interviewers__item--selected": props.selected
                      });


  return (
    <li className={interviewerClass} 
    onClick={props.setInterviewer}
    selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        // interviewer={value}
      />
      {props.selected && props.name}
    </li>
  )
}

