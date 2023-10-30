import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const CityComponent = (props) => {
  const { setCity, fetchWeather, city } = props;

  return (
    <>
      <WeatherLogo src="https://www.svgrepo.com/show/502423/weather.svg"></WeatherLogo>
      <SearchBox
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather(city);
        }}
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />             
        </button>
      </SearchBox>
    </>
  );
};

export default CityComponent;

const WeatherLogo = styled.img`
  width: 140px;
  height: 140px;
  margin: 30px auto;
`;

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  color: white;
  font-size: 20px;
  margin: 12px auto;
  border: gray solid 2px;
  border-radius: 24px;
  & input {
    padding: 10px;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 24px;
  }
  & button {
    position: relative;
    left: 2px;
    padding: 10px;
    font-size: 18px;
    border: none;
    color: white;
    background-color: rgb(61 145 205);
    cursor: pointer;
    border-radius: 0px 22px 22px 0px;
  }
`;
