import React from 'react'
import classNames from "classnames";
import "../components/DayListItem.scss"


export default function DayListItem(props) {
  const dayInfoClass = classNames("day-list__item", {
                      "day-list__item--selected": props.selected,
                      "day-list__item--full": !props.spots

  });
  
  // adapts string to quantity of spots remaining (single, plural, none)
  let spotInfo;
  if (props.spots === 0) {
    spotInfo = "no spots remaining";
  } else if (props.spots === 1) {
    spotInfo = "1 spot remaining";
  } else {
    spotInfo = props.spots + " spots remaining";
  }


  
  return (
    <li onClick={() => props.setDay(props.name)} className={dayInfoClass} data-cy="day">
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{spotInfo}</h3>
    </li>
  )
}

