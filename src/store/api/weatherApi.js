import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["Weather", "Forecast"],
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city) => ({
        url: "/current.json",
        params: {
          key: API_KEY,
          q: city,
          aqi: "no",
        },
      }),
      providesTags: (result, error, city) => [{ type: "Weather", id: city }],
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: 60,
    }),

    getForecast: builder.query({
      query: ({ city, days = 7 }) => ({
        url: "/forecast.json",
        params: {
          key: API_KEY,
          q: city,
          days,
          aqi: "no",
          alerts: "no",
        },
      }),
      providesTags: (result, error, { city }) => [
        { type: "Forecast", id: city },
      ],
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: 60,
    }),
    searchCities: builder.query({
      query: (input) => ({
        url: "/search.json",
        params: {
          key: API_KEY,
          q: input,
        },
      }),
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
  useSearchCitiesQuery,
} = weatherApi;
