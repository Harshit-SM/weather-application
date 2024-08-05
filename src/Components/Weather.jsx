import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  const API_KEY = "5acc1683650652bab831ecf7d57fd397";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  // const url2 = `http://api.weatherapi.com/v1/current.json?key=c47b73302c6f418983a125257242407&q=${city}`

  function handleOnChange(event) {
    setCity(event.target.value);
  }

  const fetchData = async() => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      if (response.ok) {
        setWeather(data);
        console.log(data);
        setError("");
        setCity("");
      } else {
        setError("No data found. Please enter a valid city name.");
        setWeather(null)
      }
    } catch (error) {
      setError("No data found. Please enter a valid city name.");
      setWeather(null)
    }
  };

  const handlekey = (e) => {
    if (e.key === 'Enter') {
       fetchData();
    }

  };

  const getBackgroundClass = (temp) => {
    if (temp <=5 && temp <= 0) {
      return "cold";
    }else if (temp > 5 && temp <= 15) {
      return "cool";
    } else if (temp > 15 && temp <=30) {
      return "mild";
    } else if (temp > 30 && temp <= 50) {
      return "hot";
    } else {
      return "hot";
    }
  };

  const backgroundClass = weather ? getBackgroundClass(weather.main.temp) : "";


  return (
    <div className={`container ${backgroundClass}`}>
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          onKeyPress={handlekey}
          placeholder="Enter any city name"
        ></input>
        <button onClick={() => fetchData()}>
          <FaSearch></FaSearch>
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            ></img>
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>
              {Math.round(weather.main.temp)}
              <span>&deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn></MdLocationOn>
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind></FaWind>
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity></WiHumidity>
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
