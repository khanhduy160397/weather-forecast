import { useEffect, useState } from "react";
import "../src/App.css";
import humidity from "./assets/humidity.png";
import sunny from "./assets/sunny.gif";
import temp from "./assets/cels.png";
import uvIndex from "./assets/uv.png";
import wID from "./assets/wind.png";
import rain from "./assets/rainny.gif";
import cloud from "./assets/cloudy.gif";
import night from "./assets/night.gif"
import axios from "../node_modules/axios"
import night_sky from "./assets/dark-sky.jpg"
import moon from "./assets/moon.png";
import sunny_sky from "./assets/sunny.png"
import sky_sun from "./assets/sunny_sky.jpg"

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
  const [background_weather, setBgWeather] = useState("");
  let params = "";

  // Call api to get value
  useEffect(async () => {
      
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
        setBgWeather(sky_sun);
      } else if (data_current.condition.text.includes("cloud")) {
        setWeather(cloud);
        setBgWeather(sky_sun);
      } else {
        setWeather(sunny_sky);
        setBgWeather(sky_sun);
      }
      
    } else {
      setWeather(moon);
      setBgWeather(night_sky);
    }

    if(document.getElementById('weather_div') != null) {
      if(isDay) {
        document.getElementById('weather_div').style.textShadow = "0px 0px 6px #797979";
        document.querySelector('.weather_item').classList.add("weather_item_sun");
        document.querySelector('.weather_content_left').classList.remove('text-white');
      } else {
        document.querySelectorAll('.weather_content_infor').forEach(item=>{
          item.classList.add('text_color_white');
        })
      }
    }
    
    setLoading(false);
  }, [loading, weather, background_weather, isDay]);

  function handleChange(event) {
    event.target.value = 0 ? setIsDay(true) : setIsDay(false)
  }

  if (loading) {
    return <>
      <div className="d-flex justify-content-center align-items-center loading">
          <div className="spinner-border" role="status">
             <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>;
  } else {
    return (
      <>
        <div className="container-fluid weather_section px-0" id="weather_div">
        <select onChange={handleChange}>
            <option value={0}>Day</option>
            <option value={1}>Night</option>
          </select>
            <div className="weather_content">
                <img src={background_weather} width="100%" height="100%" />
                <div className="mx-auto weather_item">
                    <div className="weather_content_left container text-white d-flex align-items-center justify-content-center">
                        <div className="weather_location">
                           <h1 className="weather_location_title">
                             {location}
                           </h1>
                           <h3 className="local_time">
                             {localTime}
                           </h3>
                           <h1 className="temp">
                              {cels} <sup>o</sup> C
                            </h1>
                        </div>
                    </div>
                    <div className="weather_content_right d-flex align-items-center">
                        <img src={weather} width="100%"/>
                    </div>
                    <div className="weather_content_infor container">
                      <div className="top_content_item">
                        <img src={temp} width="100%" />
                      </div>
                      <p className="">
                        Temperature : {cels}
                        <sup>o</sup>C
                      </p>
                    </div>
                    <div className="weather_content_infor container">
                    <div className="top_content_item">
                      <img src={humidity} width="100%"/>
                    </div>
                    <p className="">Humidity : {humid}</p>
                    </div>
                    <div className="weather_content_infor container">
                    <div className="top_content_item">
                      <img src={uvIndex} width="100%"/>
                    </div>
                    <p className="">UV Index : {cels}</p>
                    </div>
                    <div className="weather_content_infor container">
                    <div className="top_content_item">
                      <img src={wID} width="100%"/>
                    </div>
                    <p className="">Wind : {wind} mph</p>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
}

export default App;
