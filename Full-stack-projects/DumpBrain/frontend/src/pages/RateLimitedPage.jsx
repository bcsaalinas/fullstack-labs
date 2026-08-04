import { Badge, Button } from "@astryxdesign/core";

const RateLimitedPage = () => {
  return (
    <main className="rate-limit-page" aria-labelledby="rate-limit-title">
      <section className="rate-limit-panel" aria-live="polite">
        <Badge label="REQUEST LIMIT" variant="warning" size="sm" />
        <div className="rate-limit-copy">
          <p className="eyebrow">Please wait</p>
          <h1 id="rate-limit-title">Too many requests</h1>
          <p>
            You have reached the current request limit. Wait a moment, then try
            again.
          </p>
        </div>
        <Button label="Try again" variant="secondary" size="lg" isDisabled />
      </section>
    </main>
  );
};

export default RateLimitedPage;
