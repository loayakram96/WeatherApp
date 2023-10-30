import React, { useState } from "react";
import styled from "styled-components";
import WeatherInfoComponent from "./WeatherInfoComponent";
import { ImLocation2 } from "react-icons/im";

const WeatherInfo = (props) => {
  const { weather, selectedUnits } = props;
  const [isFavourite, setIsFavourite] = useState(props.isFavourite);

  const favouriteIcon = () => {
    if (isFavourite) {
      return "https://pixlok.com/wp-content/uploads/2021/10/ic_star-2ku3.png";
    } else {
      return "https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png";
    }
  };

  const handleFavoriteClick = () => {
    const favourites = JSON.parse(localStorage.getItem("favorites")) || [];
    const found = favourites.find((fav) => fav.name === weather.name);
    if (!found) {
      favourites.push(weather);
      localStorage.setItem("favorites", JSON.stringify(favourites));
      setIsFavourite(true);
    } else {
      const index = favourites.findIndex((fav) => fav.name === weather.name);
      favourites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favourites));
      setIsFavourite(false);
    }
  };

  return (
    <>
      <WeatherCondition>
        <WeatherLogo
          src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
        />
      </WeatherCondition>
      <Temperature>{`${Math.floor(weather?.main?.temp - 273)}°C`}</Temperature>{" "}
      {/* From Kelvin to Celsius */}
      <Condition>{weather?.weather[0]?.description}</Condition>
      <Location>
        <ImLocation2 /> {`${weather?.name},${weather?.sys?.country}`}
        <Favourite src={favouriteIcon()} onClick={handleFavoriteClick} />
      </Location>
      <WeatherInfoContainer>
        <WeatherInfoComponent
          name="Feels like"
          value={`${Math.floor(weather?.main?.feels_like - 273)}°C`} // From Kelvin to Celsius
          checked={selectedUnits.some((item) => item.name === "Feels Like" && item.checked === true)}
        />
        <WeatherInfoComponent
          name="Humidity"
          value={`${weather?.main?.humidity}%`}
          checked={selectedUnits.some((item) => item.name === "Humidity" && item.checked === true)}
        />
        <WeatherInfoComponent 
          name="Wind" 
          value={`${weather?.wind?.speed}`} 
          checked={selectedUnits.some((item) => item.name === "Wind" && item.checked === true)}
        />
        <WeatherInfoComponent
          name="pressure"
          value={`${weather?.main?.pressure}`}
          checked={selectedUnits.some((item) => item.name === "Pressure" && item.checked === true)}
        />
      </WeatherInfoContainer>
    </>
  );
};

export default WeatherInfo;

const Favourite = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;
  vertical-align: bottom;
`;

const WeatherCondition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: auto;
`;
const Temperature = styled.div`
  margin: auto;
  font-size: 50px;
  font-weight: bold;
`;
const Condition = styled.span`
  margin: 5px auto;
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 50;
`;
const Location = styled.span`
  margin: 5px auto;
  font-size: 18px;
  font-weight: 50;
`;
const WeatherLogo = styled.img`
  width: 150px;
  height: 150px;
  margin: auto;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;
