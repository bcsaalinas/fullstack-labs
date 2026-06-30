// Presentational component — only displays data it receives via props.
export default function MovieData(props) {
  return (
    <div className="flex gap-4">
      <img
        src={props.poster}
        alt={props.title}
        className="h-40 w-28 shrink-0 rounded-md object-cover border border-border"
      />
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold leading-tight">
          {props.title}{" "}
          <span className="text-muted-foreground font-normal">({props.year})</span>
        </h3>
        <p className="text-sm text-muted-foreground">{props.genre}</p>
      </div>
    </div>
  );
}
