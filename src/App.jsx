// src/App.jsx
import { useState } from "react";
import DogInfo from "./components/DogInfo.jsx";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [dog, setDog] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchDog = async () => {
    try {
      const res = await fetch(
        "https://api.thedogapi.com/v1/images/search?include_breeds=true",
        {
          headers: { "x-api-key": API_KEY },
        }
      );
      const data = await res.json();
      const dogData = data[0];
      const breed = dogData.breeds && dogData.breeds[0];

      if (!breed || banList.includes(breed.name)) {
        fetchDog(); // Skip banned or empty
        return;
      }

      setDog(dogData);
    } catch (error) {
      console.error("Error fetching dog:", error);
    }
  };

  const toggleBan = (value) => {
    if (!value) return;
    setBanList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="whole-page">
      <h1>🐾 Dog Discover</h1>

      <button onClick={fetchDog}>Find your best friend</button>

      {dog && <DogInfo dog={dog} toggleBan={toggleBan} />}

      <div className="ban-list">
        <h3>🚫 Ban List</h3>
        {banList.length === 0 ? (
          <p>No banned breeds</p>
        ) : (
          <ul>
            {banList.map((item) => (
              <li
                key={item}
                className="clickable"
                onClick={() => toggleBan(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
