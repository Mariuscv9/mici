"use client";

import Modalcomp from "components/Modal";
import Image from "next/image";

export default function Forecast(props) {
  console.log(props.data);
  console.log(props.curent);
  const toggleStyle2 =
    props.curent.current.is_day === 1
      ? "day location_day"
      : "day location_night";
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
        <Image
          src={"http:" + props.data.day.condition.icon}
          alt="weather icon"
          width={64}
          height={64}
        />
      </div>
      <div className="probabilty">
        <h2>Probability of successful mici: {reversedPercentage}%</h2>
      </div>
      <Modalcomp data={props.data} />
    </div>
  );
}
// @refresh reset
