import React from "react";
import { useDarkMode } from "../Util/DarkModeContext"; 

export default function ProfileHeader({ pageTitle = "Key Performance Indicators (KPI)" }) {
  const { darkMode } = useDarkMode();

  return (
    <header className={`sticky flex items-center p-3 rounded-md md:px-6 ${darkMode ? 'bg-primary border-primary' : 'bg-primary border-primary'}`}>
      <div className="flex items-center mb-2">
        <div className={`text-3xl font-semibold tracking-tighter ${darkMode ? 'text-white' : 'text-white'}`}>
          {pageTitle}
        </div>
      </div>
    </header>
  );
}
