import { useState } from "react";
import { Link } from "react-router";
import { Button, TextArea, TextInput } from "@astryxdesign/core";
import { useNavigate } from "react-router";
import toaster from "react-hot-toast";
import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!content.trim() && !title.trim()) {
      return;
    }

    try {
      setIsLoading(true);

      //call backend to create new note
      const res = await axios.post("http://localhost:3000/api/", {
        title,
        content,
      });
      toaster.success("Note created successfully!");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toaster.error("Something went wrong...");
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/" aria-label="DumpBrain home">
          <span className="brand-mark" aria-hidden="true">
            DB
          </span>
          <span>DumpBrain</span>
        </Link>
        <Link className="text-action" to="/">
          Close
        </Link>
      </header>

      <main className="page-frame editor-page">
        <div className="editor-heading">
          <p className="eyebrow">New entry</p>
          <h1>Create a note</h1>
          <p className="intro-copy">
            A clear place for the thought in front of you.
          </p>
        </div>

        <form className="editor-panel" onSubmit={handleSubmit}>
          <div className="editor-field">
            <TextInput
              label="Title"
              value={title}
              onChange={setTitle}
              placeholder="Give this note a name"
              size="lg"
              width="100%"
            />
          </div>
          <div className="editor-field editor-field--body">
            <TextArea
              label="Note"
              value={content}
              onChange={setContent}
              placeholder="Start writing..."
              rows={12}
              size="lg"
              width="100%"
              maxLength={2000}
            />
          </div>
          <div className="editor-actions">
            <Link className="text-action" to="/">
              Cancel
            </Link>
            <Button label="Save note" type="submit" size="lg" />
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePage;
