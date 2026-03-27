export default function Task(props: any) {
  return (
    <div
      onClick={() => {
        props.onCheck(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}
