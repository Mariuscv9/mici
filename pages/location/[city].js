"use client"
import "app/globals.css";
import cities from "/modules/city.list.json";
import Header from "components/Header";
import Forecast from "components/Forecast";
import Footer from "components/Footer";
import Image from "next/image"


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
  const toggleStyle1 = forecastData.current.is_day=1 ? "curent locationDay" : "curent locationNight"
  
  

  const forecastElement = forecastData.forecast.forecastday.map((data) => {
    return <Forecast data={...data} slug={slugData} key={data.date} curent={...forecastData}  />;
  });
  return (
    <div className="wrapper">
      <Header />
        <div className="container-fluid main">
          <div className={toggleStyle1}>
            <h2>{curent.location.name}</h2>
            <h4>
              Contry:{curent.location.country} Region:{curent.location.region}
            </h4>
            <h2>Current weather</h2>
            <h3>Temperature now: {curent.current.temp_c}&deg;C</h3>
            <div className="temp">
            <h3>Condition: {curent.current.condition.text}</h3>
            <Image src={"http:"+forecastData.current.condition.icon} alt="weather icon" width={64} height={64} />

            </div>
        </div>
        <div className="row daysRow">       
            {forecastElement}           
        </div>
      </div>
      <Footer />
    </div>
  );
}
