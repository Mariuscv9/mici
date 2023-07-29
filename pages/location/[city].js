import React from "react";
import "app/globals.css";
import cities from "/modules/city.list.json";
import Header from "components/Header";
import Footer from "components/Footer";
import Forecast from "components/forecast";

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
  console.log(forecast);
  console.log(slug);
  return (
    <div>
      <Header />
      <div className="location"></div>
      <h2>{curent.location.name}</h2>
      <h4>
        Contry:{curent.location.country} Region:{curent.location.region}
      </h4>

      <div className="current">
        <h2>Current weather</h2>
        <h3>{curent.current.temp_c}&deg;C</h3>
        <h3>{curent.current.condition.text}</h3>
        <img src={curent.current.condition.icon} alt="weather icon" />
      </div>
      <div className="forecast-container">
        <Forecast />
      </div>
      <Footer props={forecast} />
    </div>
  );
}
