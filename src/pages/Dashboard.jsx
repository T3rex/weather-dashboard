import { useEffect, useState } from "react";
import Header from "../components/Header";
import CityWeatherCard from "../components/CityWeatherCard";
import ForecastModal from "../components/ForecastModal";
import { useSelector } from "react-redux";
import Footer from "@/components/Footer";

function Dashboard() {
  const favorites = useSelector((state) => state.root.favorites.cities);
  const cities = useSelector((state) => state.root.weather.cities);
  const [activeCity, setActiveCity] = useState(null);

  const citiesToShow = Array.from(new Set([...favorites, ...cities]));

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="min-h-screen mx-auto bg-accent">
      <Header />

      <main className="p-6 max-w-7xl mx-auto mb-auto min-h-[85vh] ">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
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
      <Footer />

      {activeCity && (
        <ForecastModal city={activeCity} onClose={() => setActiveCity(null)} />
      )}
    </div>
  );
}

export default Dashboard;
