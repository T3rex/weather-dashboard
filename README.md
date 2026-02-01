# 🌤️ Weather Dashboard

A modern weather dashboard built with React, Redux Toolkit, and RTK Query.
The app displays current weather for multiple cities, allows users to manage favorites, view detailed forecasts in a modal with charts, and control settings like temperature units.

Designed with clean state management, predictable caching, and explicit user control in mind.

# ✨ Features

## 🌍 Dashboard

- Displays weather for at least 6 cities on initial load
- Each city is rendered as a compact, interactive card
- Manual refresh support with last-updated timestamp
- Background polling every 60 seconds while modal is open

## ⭐ Favorites

- Mark/unmark cities as favorites
- Favorites persist across browser refresh
- Favorites influence dashboard rendering logic

## 🔍 City Search & Autocomplete

- Search cities using autocomplete
- Results fetched only after 2+ characters
- Click to add a city to the dashboard
- Clean dropdown UX with loading & empty states

## 📊 Forecast (Modal-based)

- Forecast opens in a modal, not a new page
- Fetches data only when a city card is clicked
- Daily / Hourly toggle
- Line charts, Area charts built with Recharts
- Manual refresh button
- Displays last fetched timestamp

⚙️ Settings

- Temperature unit toggle (°C / °F)
- Unit preference persists across refresh
- Charts and cards react instantly to unit changes

# 🧠 Design Decisions

## Why RTK Query?

- Eliminates manual loading/error state handling
- Built-in caching, refetching, polling, and metadata
- Clean separation between UI and data-fetching logic

## Caching Strategy

- In-memory caching only (no API cache persistence)
- keepUnusedDataFor: 60 seconds
- Explicit manual refetch buttons for user control
- Cache resets on full page reload (intentional)

## Polling

- Current weather data on the dashboard is automatically refreshed using RTK Query polling
- Polling interval is set to 60 seconds
- Polling runs only while the dashboard is mounted
- Each city card updates silently in the background without UI flicker
- The last updated timestamp is shown to indicate data freshness
- Manual refresh is still available and works alongside polling

# 🗂️ Folder Structure

The project follows a modular folder structure to keep concerns separated and maintainable:

```
src/
.
├── App.css
├── App.jsx
├── assets
│   ├── appLogo.png
│   └── react.svg
├── components
│   ├── AreaGraph.jsx
│   ├── CityWeatherCard.jsx
│   ├── ForecastModal.jsx
│   ├── Header.jsx
│   ├── LineGraph.jsx
│   ├── SearchInput.jsx
│   ├── ui
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── dialog.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   └── switch.jsx
│   └── UnitToggle.jsx
├── index.css
├── lib
│   └── utils.js
├── main.jsx
├── pages
│   └── Dashboard.jsx
└── store
    ├── api
    │   └── weatherApi.js
    ├── favoritesSlice
    │   └── favoriteSlice.js
    ├── rootReducer.js
    ├── settingsSlice
    │   └── settingsSlice.js
    ├── store.js
    └── weatherSlice
        └── weatherSlice.js
```

All Redux-related logic lives inside the store/ directory, keeping state management centralized and predictable.

# 🧪 Tech Stack

- React (Vite)
- Redux Toolkit
- RTK Query
- Tailwind CSS
- shadcn/ui
- Recharts

# 🚀 Installation & Running Locally

- Clone the repository using

```
git clone https://github.com/T3rex/weather-dashboard.git
```

- Navigate to the project directory and install dependencies

```
# Navigate to project directory
cd weather-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

- Open http://localhost:5173 in your browser to view the app.

# 🌐 API Keys

- Sign up at https://openweathermap.org/api to get a free API key.
- Create a `.env` file in the project root with the following content:

```
VITE_BASE_URL="https://api.weatherapi.com/v1"
VITE_WEATHER_API_KEY="your_api_key_here"
```

# Todo

- [ ] Add unit tests
- [ ] Improve mobile responsiveness

# Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
