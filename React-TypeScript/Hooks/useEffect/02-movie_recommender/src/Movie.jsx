import { useState } from "react";
import DetailCard from "./DetailCard";

export default function Movie(props) {
  const [showInfo, setShowInfo] = useState(false);

  function closeInfo() {
    setShowInfo(false);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={props.imageUrl} alt="movie poster" />

        <button
          className="info-button"
          onClick={() => setShowInfo((prev) => !prev)}
          aria-label="More info"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>

        {showInfo && (
          <div className="movie-info">
            <h3>{props.title}</h3>
            <p>Released in {props.year}</p>
          </div>
        )}
      </div>

      {!showInfo && (
        <div className="movie-meta">
          <h1>{props.title}</h1>
          <h2>{props.year}</h2>
        </div>
      )}

      {showInfo && (
        <DetailCard
          title={props.title}
          year={props.year}
          genre={props.genre}
          director={props.director}
          runtime={props.runtime}
          rating={props.rating}
          plot={props.plot}
          onClose={() => {
            setShowInfo(false);
          }}
        />
      )}
    </div>
  );
}
