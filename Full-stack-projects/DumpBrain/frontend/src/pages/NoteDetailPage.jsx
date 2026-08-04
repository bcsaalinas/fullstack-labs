import { Link } from "react-router";
import { Badge, Button, MoreMenu } from "@astryxdesign/core";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const NoteDetailPage = () => {
  const params = useParams();
  const [noteInfo, setNoteInfo] = useState({});

  //build the date based on the response from api, if none then null
  const createdAt = noteInfo.createdAt ? new Date(noteInfo.createdAt) : null;

  //format the createdAt date
  const creationTime =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(createdAt)
      : "";

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/${params.id}`);
        const data = await res.data;
        setNoteInfo(data);
      } catch (error) {
        console.error("Error fetching Note ", error);
      }
    };

    fetchNote();
  }, [params.id]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/" aria-label="DumpBrain home">
          <span className="brand-mark" aria-hidden="true">
            DB
          </span>
          <span>DumpBrain</span>
        </Link>
        <MoreMenu
          label="Note actions"
          items={[
            { label: "Edit", onClick: () => {} },
            { label: "Duplicate", onClick: () => {} },
            { type: "divider" },
            { label: "Delete", onClick: () => {} },
          ]}
        />
      </header>

      <main className="page-frame detail-page">
        <Link className="back-link" to="/">
          <span aria-hidden="true">&#8592;</span>
          All notes
        </Link>

        <article className="detail-note">
          <div className="detail-metadata">
            <Badge label="NOTE" size="sm" variant="neutral" />
            <span className="metadata-divider" aria-hidden="true" />
            <time dateTime={noteInfo.createdAt || undefined}>
              {creationTime}
            </time>
          </div>
          <h1>{noteInfo.title}</h1>
          <div className="detail-rule" aria-hidden="true" />
          <div className="note-body">
            <p>{noteInfo.content}</p>
          </div>
        </article>

        <footer className="detail-footer">
          <Button label="Edit note" variant="secondary" />
        </footer>
      </main>
    </div>
  );
};

export default NoteDetailPage;
