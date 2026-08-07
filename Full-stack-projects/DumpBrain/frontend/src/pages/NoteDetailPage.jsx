import { Link } from "react-router";
import {
  Badge,
  Button,
  MoreMenu,
  TextArea,
  TextInput,
} from "@astryxdesign/core";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import toaster from "react-hot-toast";
import { useNavigate } from "react-router";

const NoteDetailPage = () => {
  const params = useParams();
  const [noteInfo, setNoteInfo] = useState({});
  const navigate = useNavigate();
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  const [draft, setDraft] = useState({ title: "", content: "" });

  //build the date based on the response from api, if none then null
  const createdAt = noteInfo.createdAt ? new Date(noteInfo.createdAt) : null;

  async function handleDelete() {
    try {
      const res = await axios.delete(`http://localhost:3000/api/${params.id}`);
      toaster.success("Note deleted sucessfully");
      navigate("/");
    } catch (error) {
      console.error("Error in deleting note ", error);
      toaster.error("Something went wrong..");
    } finally {
    }
  }

  async function handleUpdate() {
    //error handling
    if (!draft.title || !draft.content) {
      toaster.error("Title and content cannot be empty");
      return;
    } else if (
      draft.title === noteInfo.title &&
      draft.content === noteInfo.content
    ) {
      toaster.error("No changes made to the note");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3000/api/${params.id}`, {
        title: draft.title,
        content: draft.content,
      });

      setNoteInfo(res.data);
      toaster.success("Note updated successfully");
      setIsOnEditMode(false);
    } catch (error) {
      console.error("Error updating note", error);
      toaster.error("Something wrong happened...");
    }
  }

  //format the createdAt date
  const creationTime =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(createdAt)
      : "";

  //effect to grab the note from the backend based on the id in the params, runs every time the params.id changes
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
            { type: "divider" },
            { label: "Delete", onClick: handleDelete },
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

          {isOnEditMode ? (
            <TextInput
              label="Title"
              value={draft.title || ""}
              onChange={(value) => setDraft({ ...draft, title: value })}
              placeholder="Note title"
              size="lg"
              width="min(100%, 420px)"
            />
          ) : (
            <h1>{noteInfo.title}</h1>
          )}
          <div className="detail-rule" aria-hidden="true" />
          <div className="note-body">
            {isOnEditMode ? (
              <TextArea
                label="Note content"
                value={draft.content || ""}
                onChange={(value) => setDraft({ ...draft, content: value })}
              />
            ) : (
              <p>{noteInfo.content}</p>
            )}
          </div>
        </article>

        <footer className="detail-footer">
          <Button
            label={isOnEditMode ? "Save" : "Edit"}
            variant="secondary"
            onClick={() => {
              if (isOnEditMode) {
                handleUpdate();
              } else {
                setDraft({ title: noteInfo.title, content: noteInfo.content });
                setIsOnEditMode(true);
              }
            }}
          />
        </footer>
      </main>
    </div>
  );
};

export default NoteDetailPage;
