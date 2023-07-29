import React from "react";

export default function Forecast(props) {
  console.log(props.dates);

  return (
    <div className="daywrap">
      <p>{props.dates}</p>
    </div>
  );
}
