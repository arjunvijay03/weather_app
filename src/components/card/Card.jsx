import React from 'react'
import './Card.css'
import dateFormat from "dateformat";

function Card({data}) {
  return (
    <div className='cardContainer'>
      <p className="cDate">{dateFormat(data.date, " mmmm d")} </p>
      <div className="cIcon"><img width={75} src={data.day.condition.icon} alt="" /></div>
      <p className="cWeather">{data.day.avgtemp_c}&deg;C</p>
    </div>
  )
}

export default Card
