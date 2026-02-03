# 🌤️ [Weather Dashboard](https://weather-dash99.vercel.app)

A modern weather dashboard built with React, Redux Toolkit, and RTK Query.
The app displays current weather for multiple cities, allows users to manage favorites, view detailed forecasts in a modal with charts, and control settings like temperature units.

**Designed with clean state management, predictable caching, automatic polling and explicit user control in mind.**

## Deployed link : https://weather-dash99.vercel.app

## ✨ Features

### 🌍 Real-Time Dashboard

- **Initial Load**: Displays weather data for at least 6 cities upon startup.

- **Live Updates**: Background polling refreshes city cards every 60 seconds to ensure data freshness.

- **Interactive Cards**: Compact city cards provide immediate weather snapshots and open detailed views on click.

### 🔍 Smart Search & Autocomplete

- **Autocomplete**: Intelligent city search that fetches suggestions after typing 2+ characters.

- **Dynamic Addition**: Add new cities to your dashboard instantly from search results.

### 📊 Advanced Forecasting (Authenticated)

- **Modal-Based View**: Detailed forecasts open in a seamless modal overlay.

- **Data Visualization**: Interactive Line and Area charts built with Recharts for daily and hourly trends.

- **On-Demand Fetching**: Forecast data is fetched only when a specific city is selected to optimize bandwidth.

### ⭐ Personalization & Settings

- **Favorites**: Mark cities as favorites to have them persist across sessions via local storage.

- **Unit Conversion**: Toggle between Celsius (°C) and Fahrenheit (°F) with instant updates across all cards and charts.

- **Persistence**: User preferences for units and favorite cities are remembered between browser refreshes.

---

# 🧠 Design Decisions & Architecture

### State Management with Redux Toolkit (RTK)

The app uses a centralized store with a rootReducer and RTK Query for API interactions.

- **RTK Query**: Handles the complexity of data fetching, loading states, error handling, and caching automatically.

- **Caching Strategy**: Implements an in-memory cache with a 60-second duration (keepUnusedDataFor: 60). This ensures that navigating back to a recently viewed city doesn't trigger unnecessary network requests.

- **Polling**: Automatic polling is configured at the API level, allowing the dashboard to update silently without UI flickers.

### Authentication via Clerk

- **Secure Access**: Utilizes Clerk.dev for robust user authentication, including Google Sign-In.

- **Protected Features**: While current weather is public, the detailed forecast data is restricted to logged-in users to protect API usage and provide a personalized experience.

---

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

## 🧪 Tech Stack

- Frontend: React 19 (Vite)
- State/Data: Redux Toolkit & RTK Query
- Styling: Tailwind CSS & shadcn/ui
- Charts: Recharts
- Auth: Clerk.dev
- Icons: Lucide-React

## 🚀 Installation & Running Locally

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

## 🌐 API Keys

- Sign up at http://api.weatherapi.com/v1 to get a free API key.
- Create a `.env` file in the project root with the following content:

```
VITE_BASE_URL="https://api.weatherapi.com/v1"
VITE_WEATHER_API_KEY="your_api_key_here"
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

## Todo

- [ ] Add unit tests
- [x] Improve mobile responsiveness
- [x] Add authentication and google sign-in

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
