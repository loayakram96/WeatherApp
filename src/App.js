import axios from "axios";
import React, { useState, Suspense } from "react";
import styled from "styled-components";
import CityComponent from "./components/CityComponent";
import CurrentLocation from "./components/CurrentLocation";
import Favourites from "./components/Favourites";
import WeatherUnitsWrapper from "./components/WeatherUnitsWrapper";
import { BiArrowBack } from "react-icons/bi";

// This should be in .env file but for the sake of simplicity I will leave it here
const API_KEY_openweathermap = "a8c9cb1945b07f6a34fb2a63893a661d";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [found, setFound] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [cityImage, setCityImage] = useState("");
  const [cityImageLoaded, setCityImageLoaded] = useState(false);

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
    setCityImageLoaded(false);
    try {
      const response = await axios.get(
        `https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase()}/images/`
      );
      setCityImage(response.data.photos[0].image.mobile);
      setCityImageLoaded(true);
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
        setApiError(false);
        checkFavourite(response.data.name);
      } catch {
        setApiError(true);
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

  const reset = () => {
    setFound(false);
    setCity("");
    setCityImage("");
    setApiError(false);
  };

  return (
    <>
      {found && cityImageLoaded ? (
        <CityImage src={cityImage}></CityImage>
      ) : null}
      <Container>
        <TurfCoach src="https://www.turfcoach.com/_next/static/media/turfcoach-black.99ee8257.svg"></TurfCoach>
        <Header>
          {found || apiError ? (
            <Back onClick={() => reset()}>
              <BiArrowBack />
            </Back>
          ) : null}
          <AppLabel>Weather App</AppLabel>
        </Header>
        {weather && found ? (
          <Suspense fallback={<div>Loading...</div>}>
            <WeatherInfo
              weather={weather}
              setFound={setFound}
              isFavourite={isFavourite}
              selectedUnits={units}
            />
          </Suspense>
        ) : apiError && city.length > 0 ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Error setApiError={setApiError} />
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
    </>
  );
}
export default App;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const TurfCoach = styled.img`
  object-fit: cover;
  top: 0;
  opacity: 0.5;
`;
const Back = styled.span`
  color: #193c57;
  font-size: 25px;
  cursor: pointer;
  position: fixed;
`;
const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  box-shadow: 0 3px 6px 0 #555;
  padding: 0 20px 20px 20px;
  border-radius: 24px;
  width: 380px;
  background-color: white;
  font-family: "DM Sans", sans-serif;
  z-index: 1;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const CityImage = styled.img`
  object-fit: cover;
  top: 0;
  opacity: 0.5;
  z-index: 0;
  position: fixed;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
`;

const AppLabel = styled.span`
  color: rgb(65, 168, 241);
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;
