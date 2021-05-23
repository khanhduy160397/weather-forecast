import { useEffect, useState } from "react";
import "../src/App.css";
import humidity from "./assets/humidity.png";
import sunny from "./assets/sunny.gif";
import temp from "./assets/thermometer-temperature-svgrepo-com.svg";
import uvIndex from "./assets/uv.jpg";
import wID from "./assets/clould.png";
import rain from "./assets/rainny.gif";
import cloud from "./assets/cloudy.gif";
import night from "./assets/night.gif"
import axios from "../node_modules/axios"

function App() {
  const [date, setDate] = useState("");
  const [cels, setCels] = useState(0);
  const [humid, setHumid] = useState(0);
  const [wind, setWind] = useState(0);
  const [location, setLocaltion] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [weather, setWeather] = useState(sunny);
  const [loading, setLoading] = useState(true);
  const [isDay, setIsDay] = useState(true);
  // Call api to get value
  useEffect(() => {
      async function getWeather() {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json?key=2b5ae3f80e774339b5461932212204&q=Ho Chi Minh&aqi=yes"
      );
      console.log(response.data);
      const data_current = response.data.current;
      const data_location = response.data.location;
      setCels(data_current.temp_c);
      setHumid(data_current.humidity);
      setWind(data_current.wind_mph);
      setDate(data_current.last_updated);
      setLocalTime(data_location.localtime);
      setLocaltion(data_location.name);
      if(data_current.is_day !== 1) {
        setIsDay(false);
      }

      if(isDay) {
        if (data_current.condition.text.includes("rain")) {
          setWeather(rain);
        } else if (data_current.condition.text.includes("cloud")) {
          setWeather(cloud);
        } else {
          setWeather(sunny);
        }
      } else {
        setWeather(night);
      }
      console.log(isDay);
      setLoading(false);
    }
    getWeather();
  }, [isDay, weather]);

  if (loading) {
    return <>
      <div className="loading">
        Loading...
      </div>
    </>;
  } else {
    return (
      <>
        <div className="container">
          <h1>Weather Forecast</h1>
          <div className="weather_info mt-2" style={{ height: "80vh" }}>
            <div
              className="top_item row mx-0"
              style={{ height: "65%", overflow: "hidden" }}
            >
              <div className="col-lg-3  top_item__left p-0">
                <img src={weather} width="100%" height="100%" />;
              </div>
              <div className="col-lg-9 px-0">
                <div
                  className="top_item__right-top mb-2 row align-items-center text-dark text-center"
                  style={{ height: "50%"}}
                >
                  <div className="top_content col-lg-3">
                    <div className="top_content_item">
                      <img src={temp} />
                    </div>
                    <p className="">
                      Temperature : {cels}
                      <sup>o</sup>C
                    </p>
                  </div>

                  <div className="top_content col-lg-3">
                    <div className="top_content_item">
                      <img src={humidity} />
                    </div>
                    <p className="">Humidity : {humid}</p>
                  </div>

                  <div className="top_content col-lg-3">
                    <div className="top_content_item">
                      <img src={uvIndex} />
                    </div>
                    <p className="">UV Index : {cels}</p>
                  </div>

                  <div className="top_content col-lg-3">
                    <div className="top_content_item">
                      <img src={wID} />
                    </div>
                    <p className="">Wind : {wind} mph</p>
                  </div>
                </div>

                <div
                  className="top_item__right-bottom bg-light"
                  style={{ height: "50%" }}
                ></div>
              </div>
            </div>
            <div
              className="center_item pl-2 d-flex"
              style={{ height: "5%", backgroundColor: "brown" }}
            >
              <span
                className="font-weight-bold text-white border-right pr-4 d-flex align-items-center"
                style={{ height: "100%" }}
              >
                Local time : {localTime} at {location}
              </span>

              <span
                className="font-weight-bold text-white d-flex align-items-center px-4"
                style={{ height: "100%" }}
              >
                Last update : {date}
              </span>
            </div>
            <div
              className="bottom_item"
              style={{ height: "30%", backgroundColor: "paleturquoise" }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
