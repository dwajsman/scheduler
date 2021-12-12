import React from 'react'
import classNames from "classnames";
import "./DayListItem.scss"
import "./DayList.scss"
import { action } from '@storybook/addon-actions/dist/preview';
import DayListItem from './DayListItem';


export default function DayList(props) {
  // EXAMPLE https://www.javatpoint.com/react-map
  // const myLists = props.myLists;  
  // const listItems = myLists.map((myList) =>  
  //   <li>{myList}</li>  
  // );  
    
  const daysInfo = props.days;
  const listDays = daysInfo.map((oneDay) =>
    <DayListItem 
        key={oneDay.id}
        name={oneDay.name} 
        spots={oneDay.spots} 
        selected={oneDay.name === props.value}
        setDay={props.onChange}  
    />
  );

  return(
    <ul>
      {listDays}    
    </ul>
  )
}
