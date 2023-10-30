import React from "react";
import axios from "axios";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

const API_KEY_openweathermap = "a8c9cb1945b07f6a34fb2a63893a661d";

const CurrentLocation = ({ setCity, setFound, fetchWeather }) => {
  const onSuccess = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY_openweathermap}`
      );
      fetchWeather(response.data.name);
      setCity(response.data.name);
      setFound(true);
    } catch {}
  };

  const fetchWeatherViaLocation = async () => {
    if (!("geolocation" in navigator)) {
      onError();
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  const onError = () => {
    try {
      alert("Permission denied. Please allow location access in your browser.");
    } catch {
      setFound(false);
    }
  };

  return (
    <>
      <IconButton
        title="Get Device Location"
        icon={faLocationDot}
        event={fetchWeatherViaLocation}
      />
    </>
  );
};

export default CurrentLocation;
