import React from "react";
import UnitToggle from "./UnitToggle";
import SearchInput from "./SearchInput";
import { useDispatch } from "react-redux";
import { addCity } from "@/store/weatherSlice/weatherSlice";
import appLogo from "../assets/appLogo.png";

const Header = () => {
  const dispatch = useDispatch();

  const onSelect = (city) => {
    dispatch(addCity(city));
  };

  return (
    <header className="w-full border-b bg-gray-100">
      <div
        className="
          mx-auto max-w-7xl
          px-4 py-3
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <img
            src={appLogo}
            alt="Weather App Logo"
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
            Weather Dashboard
          </h2>
        </div>

        <div className="w-full sm:max-w-md">
          <SearchInput onSelect={onSelect} />
        </div>

        <div className="flex justify-center sm:justify-end">
          <UnitToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
