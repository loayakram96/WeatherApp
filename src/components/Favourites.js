import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

const Favourites = ({ fetchWeather }) => {
  const [isFavouritesChosen, setIsFavouritesChosen] = useState(false);
  const [favouritesButtonText, setFavouritesButtonText] =
    useState("Show Favourites");
  const [favouritesList, setFavourites] = useState([]);

  useEffect(() => {
    const favouritesList = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavourites(favouritesList);
  }, []);

  const listFavourites = () => {
    if (isFavouritesChosen) {
      setIsFavouritesChosen(false);
      setFavouritesButtonText("Show Favourites");
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
      <IconButton
        title={favouritesButtonText}
        icon={faStar}
        event={listFavourites}
      />
      {isFavouritesChosen ? (
        <FavouritesWrapper>
          {favouritesList.map((favourite) => (
            <FavouriteCity onClick={() => fetchCityWeather(favourite.name)}>
              {favourite.name}
            </FavouriteCity>
          ))}
        </FavouritesWrapper>
      ) : null}
    </>
  );
};

export default Favourites;

const FavouritesWrapper = styled.div`
  overflow: auto;
  max-height: 4rem;
  width: inherit;
`;

const FavouriteCity = styled.div`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;
