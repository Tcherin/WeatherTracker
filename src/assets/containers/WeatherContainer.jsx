/* eslint-disable no-unused-vars */
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for this resource");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  // const getData = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
  //     );
  //     console.log(res);
  //     if (!res.ok) {
  //       throw Error("Could not find data for this resource.");
  //     }
  //     const data = await res.json();
  //     setWeatherData(data);
  //     setIsPending(false);
  //     setError(null);
  //   } catch (err) {
  //     setIsPending(false);
  //     setError(err.message);
  //   }
  // };

  return (
    <div>
      <SearchBar />
      <WeatherCard />
    </div>
  );
};

export default WeatherContainer;
