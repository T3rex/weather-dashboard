import React from "react";
import UnitToggle from "./UnitToggle";
import SearchInput from "./SearchInput";
import { useDispatch } from "react-redux";
import { addCity } from "@/store/weatherSlice/weatherSlice";
import appLogo from "../assets/appLogo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { LogIn } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();

  const onSelect = (city) => {
    dispatch(addCity(city));
  };

  return (
    <header className="w-full border-b bg-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand Section */}
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <img
            src={appLogo}
            alt="Logo"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
          />
          <h2 className="font-bold text-xl sm:text-2xl text-slate-800">
            Weather Dashboard
          </h2>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:max-w-md">
          <SearchInput onSelect={onSelect} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <UnitToggle />

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 transition-colors flex px-4 py-2 rounded-lg text-white text-sm font-medium items-center cursor-pointer shadow-sm active:scale-95">
                <LogIn size={16} />
                <span className="ml-2">Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center scale-110">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
