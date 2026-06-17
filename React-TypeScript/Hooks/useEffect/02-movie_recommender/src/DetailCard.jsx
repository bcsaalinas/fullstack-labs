export default function DetailCard(props) {
  return (
    <div>
      <div className="detail-card">
        <button
          className="detail-close"
          onClick={props.onClose}
          aria-label="Close details"
        >
          ✕
        </button>
        <h3>{props.title}</h3>
        <p className="detail-year">{props.year}</p>

        <div className="detail-list">
          <p>
            <span>Genre</span>
            {props.genre}
          </p>
          <p>
            <span>Runtime</span>
            {props.runtime}
          </p>
          <p>
            <span>Director</span>
            {props.director}
          </p>
          <p>
            <span>Rating</span>
            {props.rating}
          </p>
        </div>

        <p className="detail-plot">{props.plot}</p>
      </div>
    </div>
  );
}
