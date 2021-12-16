import React from 'react'
import classNames from "classnames";
import "../components/DayListItem.scss"
// import { action } from '@storybook/addon-actions/dist/preview';


export default function DayListItem(props) {
  const dayInfoClass = classNames("day-list__item", {
                      "day-list__item--selected": props.selected,
                      "day-list__item--full": !props.spots

  });
  

  let spotInfo;
  if (props.spots === 0) {
    spotInfo = "no spots remaining";
  // console.log(spotInfo)

  } else if (props.spots === 1) {
    spotInfo = "1 spot remaining";
  // console.log(spotInfo)

  } else {
    spotInfo = props.spots + " spots remaining";
  // console.log(spotInfo)

  }

// 
  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayInfoClass} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotInfo}</h3>
  
    </li>
  )
}


// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

