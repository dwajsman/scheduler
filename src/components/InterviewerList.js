import React from 'react'
import "../components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
      console.log("💩 InterviewerList",props.interviewers)
  const interviewersList = props.interviewers.map((interviewer) =>  
      // console.log("in map",interviewer)
      <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
      />
    
  )


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> 
        {interviewersList}
      </ul>
      </section>
  )
}

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
