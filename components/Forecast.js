"use client";

import "bootstrap/dist/css/bootstrap.css";
import Modalcomp from "components/Modal";

export default function Forecast(props) {
  console.log(props.data);
  console.log(props.curent);
  const toggleStyle2 = (props.curent.current.is_day = 1
    ? "day col-12 col-md-3 mt-5 location_day"
    : "day col-12 col-md-3 location_night");
  let percentage = props.data.day.daily_chance_of_rain;
  let reversedPercentage = 100 - percentage;
  return (
    <div className={toggleStyle2}>
      <div className="col">
        <h3>{props.data.date}</h3>
        <div className="row"></div>
        <h3>Average temperature: {props.data.day.avgtemp_c}</h3>
      </div>
      <div className="condition">
        <h3>{props.data.day.condition.text}</h3>
        <img src={props.data.day.condition.icon}></img>
      </div>
      <div className="probabilty">
        <h2>Probability of successful mici: {reversedPercentage}%</h2>
      </div>
      <Modalcomp data={props.data} />
    </div>
  );
}
// @refresh reset
