# React Weather App - Turfcoach

Simple ReactJS weather application that shows weather information giving a specific city.

![Screenshot 2023-10-30 at 15 05 26](https://github.com/loayakram96/weatherApp/assets/28843246/148ef4b4-d07a-4854-8ce0-4f3dac8e2110)

## Run Locally

Clone the project

```bash
  git clone https://github.com/loayakram96/weatherApp.git
```

Go to the project directory

```bash
  cd react-weather-app
```

Install deps

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## APIs Used

- [Open Weather API](https://openweathermap.org/api)
- [Teleport API](https://developers.teleport.org/)

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- ReactJS

## Needed Features Places

Most of the logic would be included in the ```App.js``` as it's the entry component, along with helper components depends on the needed feature
> 1. Implement a search feature that allows users to search for weather information in a
specific city.

The logic found in ```CityComponent.js```

> 2. Display relevant weather information, including optional parameters such as precipitation
and user-selected units.

The logic found in ```WeatherInfo.js``` ```WeatherInfoComponent.js``` ```WeatherUnitWrapper.js``` ```WeatherUnit.js``` 

> 3. Fetch and display an image of the queried city or location.

Included in ```App.js``` already

> 4. Allow users to add or delete cities to/from their favourites (no need for any
backend/persistent storage of the favourites)

Mainly in ```Favourites.js```

> 5. Lazy Loading

Included in ```App.js```