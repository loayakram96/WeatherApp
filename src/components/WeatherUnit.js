import React from "react";
import styled from "styled-components";

const WeatherUnit = ({ unit, handleUnitChange }) => (
  <WeatherUnitWrapper>
    <input
      type="checkbox"
      checked={unit.checked}
      onChange={() => handleUnitChange(unit.name)}
    />
    <label>
      {unit.name}
    </label>
  </WeatherUnitWrapper>
);

export default WeatherUnit;

const WeatherUnitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 10px;
`;