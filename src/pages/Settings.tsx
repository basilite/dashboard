import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import styles from "../css/settings.module.css"; 

import toggleOnIcon from "../assets/icons/security-enabled-black.svg";
import toggleOffIcon from "../assets/icons/security-disabled-black.svg";

import { useTheme } from "../context/ThemeContext";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const [language, setLanguage] = useState<"en">("en");
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: string | null; lng: string | null }>({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  useEffect(() => {
    if (geolocationEnabled) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoordinates({
              lat: pos.coords.latitude.toFixed(4),
              lng: pos.coords.longitude.toFixed(4),
            });
          },
          (err) => {
            console.warn("Geolocation error:", err.message);
            setCoordinates({ lat: null, lng: null });
          }
        );
      } else {
        alert("Geolocation not supported by the browser");
      }
    } else {
      setCoordinates({ lat: null, lng: null });
    }
  }, [geolocationEnabled]);

  return (
    <div className={`${styles.settingsContainer} flex row`}>
      <Sidebar />
      <main className={styles.dashboardMain}>
        <header className="center-flex">
          <h1>Settings</h1>
        </header>

        <section className={styles.section}>
          {/* Theme */}
          <label
            className={`${styles.securityBadge} ${theme === "dark" ? styles.active : ""}`}
            onClick={toggleTheme}
          >
            <img
              src={theme === "dark" ? toggleOnIcon : toggleOffIcon}
              alt={`theme ${theme}`}
              className={styles.iconSmall}
            />
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </label>

          {/* Language */}
          <div>
            <label htmlFor="language-select" className={styles.labelBold}>
              Language
            </label>
            <select
              id="language-select"
              value={language}
              disabled
              onChange={(e) => setLanguage(e.target.value as "en")}
              style={{ width: "100%", padding: 8, borderRadius: 6 }}
            >
              <option value="en">English</option>
            </select>
          </div>

          {/* Geolocation */}
          <label
            className={`${styles.securityBadge} ${geolocationEnabled ? styles.active : ""}`}
            onClick={() => setGeolocationEnabled((prev) => !prev)}
          >
            <img
              src={geolocationEnabled ? toggleOnIcon : toggleOffIcon}
              alt={`geolocation ${geolocationEnabled ? "on" : "off"}`}
              className={styles.iconSmall}
            />
            Geolocation: {geolocationEnabled ? "Active" : "Inactive"}
          </label>

          {/* Coordinates */}
          <div>
            <label className={styles.labelBold}>Coordinates</label>
            <input
              type="text"
              readOnly
              value={
                coordinates.lat && coordinates.lng ? `${coordinates.lat}, ${coordinates.lng}` : "N/A"
              }
              className={styles.coordinatesInput}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
