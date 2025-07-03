import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/sidebar";
import styles from "../css/settings.module.css"; 

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const [language, setLanguage] = useState<"en">("en");
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: string | null; lng: string | null }>({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if(theme === "dark") document.body.classList.add("dark-theme");
    else document.body.classList.remove("dark-theme");
  }, [theme]);

  useEffect(() => {
    if(geolocationEnabled) {
      if("geolocation" in navigator) {
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
      }
      else alert("Geolocation not supported by the browser");
    }
    else setCoordinates({ lat: null, lng: null });
  }, [geolocationEnabled]);

  return (
    <div className="pageContainer flex row">
      <Sidebar />
      <main>
        <header className="center-flex">
            <div className={styles.text}>
                <h1>Settings</h1>
            </div>
        </header>

        <section className={styles.section}>

          <div id={styles.theme}>
            <label> Theme </label>
            <button className={theme === "dark" ? styles.active : ""} onClick={toggleTheme}> {theme === "dark" ? "Dark" : "Light"} </button>
          </div>

          <div id={styles.language}>
            <label htmlFor="language"> Language </label>
            <select id="language" value={language} disabled onChange={(e) => setLanguage(e.target.value as "en")}>
              <option value="en">English</option>
              <option value="it">Italiano</option>
            </select>
          </div>
          
          <div id={styles.geolocation}>
            <label> Geolocation </label>
            <button className={theme === "dark" ? styles.active : ""} onClick={() => setGeolocationEnabled((prev) => !prev)}> {geolocationEnabled ? "Active" : "Inactive"} </button>
          </div>

          <div id={styles.coordinates}>
            <label> Coordinates </label>
            <input type="text" readOnly value={coordinates.lat && coordinates.lng ? `${coordinates.lat}, ${coordinates.lng}` : "N/A"}/>
          </div>

        </section>
      </main>
    </div>
  );
}
