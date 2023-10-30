import React from "react";
import styled from "styled-components";

const WeatherInfoComponent = (props) => {
  const { name, value, checked } = props;
  const WeatherInfoIcons = {
    "Feels like":
      "https://www.freeiconspng.com/thumbs/temperature-icon-png/temperature-icon-png-1.png",
    Humidity: "https://cdn-icons-png.flaticon.com/512/1582/1582886.png",
    Wind: "https://cdn-icons-png.flaticon.com/512/172/172922.png",
    pressure:
      "https://www.nicepng.com/png/detail/516-5168726_sea-level-pressure-icon.png",
  };
  
  return (
    <>
      {checked ? (
        <InfoContainer>
          <InfoIcon src={WeatherInfoIcons[name]} />
          <InfoLabel>
            {value}
            <div>{name}</div>
          </InfoLabel>
        </InfoContainer>
      ) : null}
    </>
  );
};

export default WeatherInfoComponent;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const InfoLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin: 15px;
  & div {
    font-size: 18px;
    text-transform: capitalize;
  }
`;
const InfoIcon = styled.img`
  width: 45px;
  height: 45px;
`;
