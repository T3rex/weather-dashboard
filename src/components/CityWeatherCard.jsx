import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../store/favoritesSlice/favoriteSlice";
import { useGetCurrentWeatherQuery } from "../store/api/weatherApi";
import { RotateCw, Wind, Droplet, MousePointer2, Heart } from "lucide-react";
import { useEffect, useState } from "react";

function formatTime(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleTimeString();
}

function CityWeatherCard({ city, onClick }) {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const unit = useSelector((state) => state.root.settings.unit);
  const favorites = useSelector((state) => state.root.favorites.cities);

  const isFavorite = favorites.includes(city);

  const { data, error, isLoading, isFetching, refetch, fulfilledTimeStamp } =
    useGetCurrentWeatherQuery(city, {
      skip: !city,
      pollingInterval: 60000,
      skipPollingIfUnfocused: true,
    });

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(city));
    } else {
      dispatch(addFavorite(city));
    }
  };
  useEffect(() => {
    let timeout;

    if (isFetching) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [isFetching]);

  // ---------------- render states ----------------

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-4 w-1/2 bg-muted rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-1/3 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle>{city}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-destructive">
          Failed to load weather
        </CardContent>
      </Card>
    );
  }

  // ---------------- success ----------------

  const temperature = unit === "C" ? data.current.temp_c : data.current.temp_f;

  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;
  const humidity = data.current.humidity;
  const country = data.location.country;
  const windspeed = data.current.wind_kph;
  const direction = data.current.wind_dir;

  return (
    <Card
      onClick={onClick}
      className={`
    cursor-pointer 
    transition-all 
    hover:shadow-lg 
    hover:-translate-y-0.5
    rounded-xl
    gap-0 ${showLoader ? "opacity-50" : "opacity-100"}
  `}
    >
      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium text-muted-foreground items-center justify-between">
              <span>
                {city}, {country}
              </span>
              <span className="flex gap-2">
                <p className="text-xs text-muted-foreground">
                  Last updated: {formatTime(fulfilledTimeStamp)}
                </p>

                <button
                  className="cursor-pointer border-2 rounded-4xl  hover:bg-accent"
                  onClick={(e) => {
                    e.stopPropagation();
                    refetch();
                  }}
                  disabled={isFetching}
                >
                  <RotateCw
                    size={16}
                    className={
                      showLoader
                        ? "animate-spin text-blue-500"
                        : "hover:animate-spin"
                    }
                  />
                </button>
              </span>
            </CardTitle>

            <div className="flex items-end gap-1">
              <span className="text-4xl font-semibold tracking-tight">
                {temperature}
              </span>
              <span className="text-lg font-medium text-muted-foreground mb-1">
                °{unit}
              </span>
            </div>
          </div>

          <button onClick={handleFavoriteClick} className="mr-2 cursor-pointer">
            {isFavorite ? (
              <Heart size={20} strokeWidth={0.5} fill="red" />
            ) : (
              <Heart size={20} strokeWidth={0.5} />
            )}
          </button>
        </div>
      </CardHeader>
      {/* Stats */}
      <CardContent className="pt-2">
        <div className="flex items-end justify-between">
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="flex flex-row gap-1">
              <Droplet size={20} strokeWidth={1} fill="aqua" stroke="aqua" />
              <span className="font-medium text-foreground">Humidity :</span>
              {humidity}%
            </p>
            <p className="flex flex-row gap-1">
              <Wind size={20} strokeWidth={0.5} />
              <span className="font-medium text-foreground">Wind:</span>{" "}
              {windspeed} kph
            </p>
            <p className="flex gap-1">
              <MousePointer2 size={20} strokeWidth={1} fill="black" />
              <span className="font-medium text-foreground ">
                Direction:
              </span>{" "}
              {direction}
            </p>
          </div>{" "}
          <div className="flex flex-col items-center text-right">
            <img src={icon} alt={condition} className="h-12 w-12" />
            <span className="text-xs font-medium text-muted-foreground capitalize">
              {condition}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CityWeatherCard;
