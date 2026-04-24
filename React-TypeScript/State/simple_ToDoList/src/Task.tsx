export default function Task(props: any) {
  return (
    <li className="task-item">
      <span className="task-number">{props.id + 1}.</span>
      <span className="task-text">{props.text}</span>
      <button
        className="delete-btn"
        onClick={() => props.onCheck(props.id)}
        title="Done & delete"
        aria-label="Delete task"
      >
        ✕
      </button>
    </li>
  );
}
