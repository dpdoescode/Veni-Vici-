// src/DogInfo.jsx
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY; // Store securely in .env

const DogInfo = ({ dog, toggleBan }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!dog) return;

    const fetchDogDetails = async () => {
      try {
        const response = await fetch(
          `https://api.thedogapi.com/v1/images/${dog.id}`,
          {
            headers: { "x-api-key": API_KEY },
          }
        );
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Error fetching dog details:", error);
      }
    };

    fetchDogDetails();
  }, [dog]);

  if (!dog) return null;

  const breed = dog.breeds && dog.breeds[0];

  return (
    <div className="dog-card">
      <img src={dog.url} alt={breed?.name || "Dog"} className="dog-img" />
      <h2
        className="clickable"
        onClick={() => toggleBan(breed?.name)}
        title="Click to ban/unban this breed"
      >
        {breed?.name || "Unknown Breed"}
      </h2>
      {breed && (
        <>
          <p>
            <strong>Breed Group:</strong>{" "}
            <span
              className="clickable"
              onClick={() => toggleBan(breed?.breed_group)}
            >
              {breed.breed_group || "Unknown"}
            </span>
          </p>
          <p>
            <strong>Temperament:</strong> {breed.temperament || "Unknown"}
          </p>
          <p>
            <strong>Life Span:</strong> {breed.life_span || "Unknown"}
          </p>
        </>
      )}
    </div>
  );
};

export default DogInfo;
