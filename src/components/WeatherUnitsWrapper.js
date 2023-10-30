import React from "react";
import WeatherUnit from "./WeatherUnit";
import styled from "styled-components";

const WeatherUnitsWrapper = ({ units, handleUnitChange }) => (
  <WeatherUnits>
    {units.map((unit, idx) => (
      <WeatherUnit key={idx} unit={unit} handleUnitChange={(e) => handleUnitChange(e)} />
    ))}
  </WeatherUnits>
);

export default WeatherUnitsWrapper;

const WeatherUnits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;