import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Favourites = ({ fetchWeather }) => {
  const [isFavouritesChosen, setIsFavouritesChosen] = useState(false);
  const [favouritesButtonText, setFavouritesButtonText] =
    useState("Get Favourites");
  const [favouritesList, setFavourites] = useState([]);

  useEffect(() => {
    const favouritesList = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavourites(favouritesList);
  }, []);

  const listFavourites = () => {
    if (isFavouritesChosen) {
      setIsFavouritesChosen(false);
      setFavouritesButtonText("Get Favourites");
    } else {
      setIsFavouritesChosen(true);
      setFavouritesButtonText("Hide Favourites");
    }
  };

  const fetchCityWeather = (city) => {
    fetchWeather(city);
  };

  return (
    <>
      <Button onClick={listFavourites}>{favouritesButtonText}</Button>
      {isFavouritesChosen ? (
        <div>
          {favouritesList.map((favourite) => (
            <FavouriteCity onClick={() => fetchCityWeather(favourite.name)}>
              {favourite.name}
            </FavouriteCity>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Favourites;

const FavouriteCity = styled.div`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 11px;
  font-size: 18px;
  border-radius: 2px;
  border: gray solid 2px;
  outline: none;
  color: white;
  background-color: #43aefc;
  cursor: pointer;
  width: 320px;
  margin-top: 10px;
`;
