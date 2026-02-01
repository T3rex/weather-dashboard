import { useGetForecastQuery } from "../store/api/weatherApi";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import LineGraph from "./LineGraph";
import { useState } from "react";
import UnitToggle from "./UnitToggle";
import { RotateCw } from "lucide-react";
import AreaGraph from "./AreaGraph";

const formatTime = (ts) => (ts ? new Date(ts).toLocaleTimeString() : "—");

function ForecastModal({ city, onClose }) {
  const unit = useSelector((state) => state.root.settings.unit);
  const [view, setView] = useState("daily");

  const { data, isLoading, isFetching, error, refetch, fulfilledTimeStamp } =
    useGetForecastQuery({ city, days: 7 }, { skip: !city });

  const dayForcasts = data?.forecast?.forecastday.map((day) => ({
    date: day.date.slice(5).split("-").join("/"),
    avgTemp: unit === "C" ? day.day.avgtemp_c : day.day.avgtemp_f,
    minTemp: unit === "C" ? day.day.mintemp_c : day.day.mintemp_f,
    maxTemp: unit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f,
  }));

  const hourForcasts = data?.forecast?.forecastday[0].hour.map((hour) => ({
    date: hour.time.slice(-5),
    temp: unit === "C" ? hour.temp_c : hour.temp_f,
  }));

  const avghumidity = data?.forecast?.forecastday.map((day) => ({
    date: day.date.slice(5).split("-").join("/"),
    humidity: day.day.avghumidity,
  }));

  const country = data?.location?.country || "Unknown";

  return (
    <Dialog open={!!city} onOpenChange={onClose}>
      <DialogContent
        className="
          max-h-[90vh]
          w-[95vw]
          sm:max-w-5xl
          lg:max-w-6xl
          p-0
          flex flex-col
        "
      >
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 mt-8">
          <DialogHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <DialogTitle className="flex flex-col gap-2 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-lg sm:text-xl font-semibold">
                  {city}, {country}
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {formatTime(fulfilledTimeStamp)}
                  </p>

                  <button
                    onClick={refetch}
                    disabled={isFetching}
                    className="
                      flex items-center justify-center
                      h-7 w-7 rounded-md border
                      hover:bg-muted disabled:opacity-50
                    "
                  >
                    <RotateCw size={14} />
                  </button>
                </div>
              </div>
            </DialogTitle>

            <div className="self-start sm:self-auto">
              <UnitToggle />
            </div>
          </DialogHeader>

          {isLoading && (
            <p className="text-sm text-muted-foreground mt-4">
              Loading forecast...
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive mt-4">
              Failed to load forecast
            </p>
          )}

          {data && (
            <div className="flex items-center justify-center sm:justify-end gap-2 my-4">
              <Label className="text-sm">Daily</Label>
              <Switch
                className="cursor-pointer"
                checked={view === "hourly"}
                onCheckedChange={(checked) =>
                  setView(checked ? "hourly" : "daily")
                }
              />
              <Label className="text-sm">Hourly</Label>
            </div>
          )}

          {data && view === "daily" && (
            <div className="w-full mb-8">
              <h2 className="text-base font-semibold mb-3">
                Temperature (Avg/Min/Max)
              </h2>
              <LineGraph data={dayForcasts} type="daily" />
            </div>
          )}

          {data && view === "hourly" && (
            <div className="w-full mb-8">
              <h2 className="text-base font-semibold mb-3">
                Hourly Temperature
              </h2>

              <LineGraph data={hourForcasts} type="hourly" />
            </div>
          )}

          {data && (
            <>
              <h2 className="text-base font-semibold mb-3">Average Humidity</h2>
              <div className="w-full">
                <AreaGraph data={avghumidity} />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForecastModal;
