import { useState } from "react";
import { WeatherInfo } from "./components/WeatherInfo";

function App() {
  const [data, setData] = useState("");
  const [city, setCity] = useState("");
  const [notFound, setNotFound] = useState("");

  const handleCity = (event) => setCity(event.target.value);

  const key = import.meta.env.VITE_API_KEY;

  const handleClick = async () => {
    try {
      setNotFound("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},pk&units=metric&appid=${key}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setNotFound("City not Found");
        } else {
          console.log("An Error Occured");
        }
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (error) {}
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="text-center text-7xl  font-extrabold">Weather App</h1>
        <div className="text-center text-3xl mt-6">
          <input
            className="border-2 border-black p-4 gap-8 mr-6"
            type="text"
            placeholder="Enter City Name"
            onChange={handleCity}
            value={city}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleClick}
            className="p-4 border-2 border-black rounded-lg shadow-lg hover:bg-black hover:text-white"
          >
            Submit
          </button>
        </div>
        <div>
          <h4 className="pt-4 text-4xl font-bold">
            {notFound ? notFound : ""}
          </h4>
        </div>

        <div className="flex gap-8 justify-center">
          <WeatherInfo
            label="Feels Like"
            value={data ? data.main.feels_like + "°C" : ""}
          />
          <WeatherInfo
            label="Humidity"
            value={data ? data.main.humidity + "%" : ""}
          />
          <WeatherInfo
            label="Temp Max"
            value={data ? data.main.temp_max + "°C" : ""}
          />
          <WeatherInfo
            label="Temp Min"
            value={data ? data.main.temp_min + "°C" : ""}
          />
        </div>
      </div>
    </>
  );
}

export default App;
