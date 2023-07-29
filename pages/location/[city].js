import "app/globals.css";
import cities from "/modules/city.list.json";
import Header from "components/Header";
import Footer from "components/Footer";
import Forecast from "components/forecast";
import { Button, Col, Container, Row } from "react-bootstrap";


export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  if (!city) return { notFound: true };

  const [curentData, forecastData] = await Promise.all([
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city.coord.lat},${city.coord.lon}`
    ),
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city.coord.lat},${city.coord.lon}&days=3&aqi=no&alerts=no`
    ),
  ]);

  const [curent, forecast] = await Promise.all([
    curentData.json(),
    forecastData.json(),
  ]);

  if (!curent) return { notFound: true };

  const slug = context.params.city;

  return {
    props: {
      slug: slug,
      curent: curent,
      forecast: forecast,
    },
  };
}

const getCity = (param) => {
  const cityP = param.trim();
  const split = cityP.split("-");
  const cityId = split[split.length - 1];
  if (!cityId) return null;

  const city = cities.find((city) => city.id.toString() == cityId);
  if (city) return city;
  else return null;
};

export default function City({ curent, slug, forecast }) {
  console.log(curent);
  const forecastData = forecast;
  const slugData = slug;
  console.log(forecastData);


  const forecastElement = forecastData.forecast.forecastday.map((data) => {
    return <Forecast data={...data} slug={slugData} key={data.date} />;
  });
  return (
    <div>
      <Header />
      <div className="location">
       
        <h2>{curent.location.name}</h2>
        <h4>
          Contry:{curent.location.country} Region:{curent.location.region}
        </h4>
        <h2>Current weather</h2>
        <h3>Temperature now: {curent.current.temp_c}&deg;C</h3>
        <div className="temp">
        <h3>Condition: {curent.current.condition.text}</h3>
        <img src={curent.current.condition.icon} alt="weather icon" />
      </div>
        
      </div>
        <div className="forecast-container">
          {forecastElement}
         
        </div>

      <Footer />
    </div>
  );
}
