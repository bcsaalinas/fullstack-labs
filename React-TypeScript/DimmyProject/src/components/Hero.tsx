import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__texture" />
      <div className="hero__glow hero__glow--pink" />
      <div className="hero__glow hero__glow--sand" />

      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">
            <span className="hero__rule" />
            <span className="hero__kicker">Financial Goal Tracker</span>
          </div>

          <h1 className="hero__headline">
            Visualize your goal
            <br />
            and{" "}
            <span className="hero__accent">
              <span className="hero__accent-word">achieve</span>
              <svg
                className="hero__accent-underline"
                viewBox="0 0 160 8"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5 Q40 1 80 5 Q120 9 158 5"
                  stroke="var(--c-accent)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>{" "}
            anything.
          </h1>

          <p className="hero__subheadline">
            Set a savings goal. Track your progress. <strong>Make it happen.</strong>
          </p>

          <div className="hero__ctas">
            <button className="btn btn--primary hero__primary">
              Get started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className="btn btn--ghost">See how it works</button>
          </div>

          <div className="hero__stats">
            {[
              { value: "100%", label: "Free to use" },
              { value: "∞", label: "Goals" },
              { value: "0", label: "Excuses" },
            ].map(({ value, label }) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__aside">
          <div className="hero__aside-glow" />
          <div className="hero__card">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="3" y="3" width="30" height="30" rx="5" stroke="#C4876B" strokeWidth="1.5" />
              <circle cx="12" cy="13" r="3" stroke="#C4876B" strokeWidth="1.5" />
              <path
                d="M3 24l8-7 6 6 4-4 8 8"
                stroke="#C4876B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="hero__card-copy">
              <p className="hero__card-title">Screenshot coming soon</p>
              <p className="hero__card-sub">380 × 480</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
