import React from 'react'
import "./DayListItem.scss"
import "./DayList.scss"
import DayListItem from './DayListItem';


export default function DayList(props) {
    
  const daysInfo = props.days;
  const listDays = daysInfo.map((oneDay) =>
  {
    
      return <DayListItem 
        data-cy="day"
        key={oneDay.id}
        name={oneDay.name}
        spots={oneDay.spots}
        selected={oneDay.name === props.value}
        setDay={props.onChange} />;
    }
  );

  return(
    <ul>
      {listDays}    
    </ul>
  )
}
