import { useEffect, useState } from "react";
import Header from "../components/Header";
import CityWeatherCard from "../components/CityWeatherCard";
import ForecastModal from "../components/ForecastModal";
import { useSelector } from "react-redux";

const DEFAULT_CITIES = ["Delhi"];

function Dashboard() {
  const favorites = useSelector((state) => state.root.favorites.cities);
  const cities = useSelector((state) => state.root.weather.cities);
  const [activeCity, setActiveCity] = useState(null);

  let citiesToShow = [];

  if (favorites.length >= 5) {
    citiesToShow = favorites;
  } else {
    const remaining = cities.filter((city) => !favorites.includes(city));

    citiesToShow = [...favorites, ...remaining.slice(0, 9 - favorites.length)];
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  return (
    <div className="min-h-screen mx-auto ">
      <Header />

      <main className="p-6 max-w-7xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {citiesToShow.map((city) => (
            <CityWeatherCard
              key={city}
              city={city}
              onClick={() => {
                setActiveCity(city);
                console.log("clicked");
              }}
            />
          ))}
        </div>
      </main>

      {activeCity && (
        <ForecastModal city={activeCity} onClose={() => setActiveCity(null)} />
      )}
    </div>
  );
}

export default Dashboard;
