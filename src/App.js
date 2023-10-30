import axios from "axios";
import React, { useState, Suspense } from "react";
import styled from "styled-components";
import CityComponent from "./components/CityComponent";
import CurrentLocation from "./components/CurrentLocation";
import Favourites from "./components/Favourites";
import WeatherUnitsWrapper from "./components/WeatherUnitsWrapper";

// This should be in .env file but for the sake of simplicity I will leave it here
const API_KEY_openweathermap = "a8c9cb1945b07f6a34fb2a63893a661d";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [found, setFound] = useState(false);
  const [apierror, setApierror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [cityImage, setCityImage] = useState("");

  // Lazy Loading Components
  const Error = React.lazy(() => import("./components/Error"));
  const WeatherInfo = React.lazy(() => import("./components/WeatherInfo"));

  // We can add more units here if we want such as (Sea Level, Ground level, Visibility, etc.), but also adapt the logic in the WeatherInfo.js component
  const [units, setUnits] = useState([
    { name: "Feels Like", checked: false },
    { name: "Humidity", checked: false },
    { name: "Wind", checked: false },
    { name: "Pressure", checked: false },
  ]);

  // Check if the city is saved as favourite
  const checkFavourite = (city) => {
    const favourites = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = favourites.find((fav) => fav.name === city);
    if (found) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  };

  const fetchCityImage = async (city) => {
    try {
      const response = await axios.get(
        `https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/images/`
      );
      setCityImage(response.data.photos[0].image.mobile);
    } catch {
      setCityImage("");
    }
  };

  const fetchWeather = async (CurrCity) => {
    fetchCityImage(CurrCity);
    if (CurrCity) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CurrCity}&appid=${API_KEY_openweathermap}`
        );
        setWeather(response.data);
        setFound(true);
        setApierror(false);
        checkFavourite(response.data.name);
      } catch {
        setApierror(true);
        setFound(false);
      }
      setLoading(false);
    }
  };

  // handle which weather units to display
  const handleUnitChange = (changedUnit) => {
    const newUnits = units.map((unit) => {
      if (unit.name === changedUnit) {
        return { ...unit, checked: !unit.checked };
      } else {
        return unit;
      }
    });
    setUnits(newUnits);
  };

  return (
    <Container>
      <AppLabel>Weather App - Turfcoach</AppLabel>
      <CityImage src={cityImage}></CityImage>
      {weather && found ? (
        <Suspense fallback={<div>Loading...</div>}>
          <WeatherInfo
            weather={weather}
            setFound={setFound}
            isFavourite={isFavourite}
            selectedUnits={units}
            BackClick={() => {
              setCity("");
              setCityImage("");
            }}
          />
        </Suspense>
      ) : apierror && city.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Error
            setApierror={setApierror}
            BackClick={() => {
              setCity("");
            }}
          />
        </Suspense>
      ) : (
        <>
          <CityComponent
            setCity={(e) => {
              setCity(e);
            }}
            city={city}
            fetchWeather={fetchWeather}
            weather={weather}
            loading={loading}
          />
          <WeatherUnitsWrapper
            units={units}
            handleUnitChange={(e) => {
              handleUnitChange(e);
            }}
          />
          <CurrentLocation
            setCity={setCity}
            setFound={setFound}
            fetchWeather={fetchWeather}
          />
          <Favourites fetchWeather={fetchWeather} />
        </>
      )}
    </Container>
  );
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 40px 20px;
  border-radius: 4px;
  width: 380px;
  background-color: white;
  font-family: "DM Sans", sans-serif;

  > div {
    margin: auto;
    padding-bottom: 15px;
    font-weight: bold;
    font-size: 23px;
    color: gray;
  }
`;

const CityImage = styled.img`
  object-fit: cover;
  top: 0;
  opacity: 0.5;
  z-index: -1;
  position: fixed;
`;

const AppLabel = styled.span`
  color: rgb(65, 168, 241);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: -22px;
`;
