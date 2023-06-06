import React, { useEffect, useState } from 'react';
import { useLocation } from '../context/LocationContext';
import axios from 'axios';
import './WeatherGraphs.css';

const WeatherGraphs = () => {
  const { location } = useLocation();
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeatherForecast = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key={your_api_key}&q=${location}&days=7`);
        const forecastData = response.data;
        const processedData = processWeatherData(forecastData);
        setWeatherData(processedData);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    if (location) {
      getWeatherForecast();
    }
  }, [location]);

  const processWeatherData = (forecastData) => {
    const dailyForecasts = forecastData.forecast.forecastday;

    const processedData = dailyForecasts.map((item) => {
      const date = new Date(item.date);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temperature = item.day.avgtemp_c;
      const humidity = item.day.avghumidity;
      const condition = item.day.condition.text;
      const icon = getWeatherIcon(item.day.condition.icon);

      return { day, temperature, humidity, condition, icon };
    });
    return processedData;
  };

  const getWeatherIcon = (iconCode) => {
    const iconUrl = `https:${iconCode}`;

    return iconUrl;
  };

  return (
    <div>
      {weatherData.length > 0 ? (
        <div>
          <h2 className='text-center'>1 Week Weather Forecast for {location}</h2>
          <ul className="weather-list">
            {weatherData.map((day, index) => (
              <li key={index}>
                <div>
                  <span>{day.day}</span>
                </div>
                <img src={day.icon} alt={day.condition} title={day.condition} />
                <div>
                  <span title='temperature'>{day.temperature}°C</span>
                  <span title='humidity'>{day.humidity}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      ) : (<p>Loading weather data...</p>)}
    </div >
  );
};

export default WeatherGraphs;