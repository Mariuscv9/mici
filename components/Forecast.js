export default function Forecast(props) {
  console.log(props.dates);

  return (
    <div className="daywrap">
      <p>Average temperature: {props.data.day.avgtemp_c}</p>
      <div className="condition">
        <p>{props.data.day.condition.text}</p>
        <img src={props.data.day.condition.icon}></img>
      </div>
    </div>
  );
}
