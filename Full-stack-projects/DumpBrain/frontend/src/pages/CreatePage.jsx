import { useState } from "react";
import { Link } from "react-router";
import { Button, TextArea, TextInput } from "@astryxdesign/core";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/" aria-label="DumpBrain home">
          <span className="brand-mark" aria-hidden="true">DB</span>
          <span>DumpBrain</span>
        </Link>
        <Link className="text-action" to="/">Close</Link>
      </header>

      <main className="page-frame editor-page">
        <div className="editor-heading">
          <p className="eyebrow">New entry</p>
          <h1>Create a note</h1>
          <p className="intro-copy">A clear place for the thought in front of you.</p>
        </div>

        <form className="editor-panel" onSubmit={(event) => event.preventDefault()}>
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
            <Link className="text-action" to="/">Cancel</Link>
            <Button label="Save note" type="submit" size="lg" />
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePage;
