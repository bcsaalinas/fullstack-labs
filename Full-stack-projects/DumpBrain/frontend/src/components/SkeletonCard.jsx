import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="note-row skeleton-card" aria-hidden="true">
      <span className="note-rail note-rail--green" aria-hidden="true" />

      <span className="note-row-content">
        <span className="note-row-topline">
          <Skeleton
            width={48}
            height={20}
            borderRadius="var(--radius-element)"
            baseColor="var(--color-background-muted)"
            highlightColor="var(--color-background-surface)"
          />
          <Skeleton
            width={80}
            height={14}
            borderRadius="var(--radius-element)"
            baseColor="var(--color-background-muted)"
            highlightColor="var(--color-background-surface)"
          />
        </span>

        <Skeleton
          height={24}
          width="60%"
          borderRadius="var(--radius-element)"
          baseColor="var(--color-background-muted)"
          highlightColor="var(--color-background-surface)"
        />

        <Skeleton
          count={2}
          height={18}
          borderRadius="var(--radius-element)"
          baseColor="var(--color-background-muted)"
          highlightColor="var(--color-background-surface)"
        />
      </span>

      <span className="note-arrow" aria-hidden="true">
        <Skeleton
          width={24}
          height={24}
          circle
          baseColor="var(--color-background-muted)"
          highlightColor="var(--color-background-surface)"
        />
      </span>
    </div>
  );
};

export default SkeletonCard;
