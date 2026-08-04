import { Link } from "react-router";
import { Badge, Button, Skeleton } from "@astryxdesign/core";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/SkeletonCard.jsx";

import axios from "axios";
import toast from "react-hot-toast";
import RateLimitedPage from "../pages/RateLimitedPage.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliceText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  useEffect(
    () => {
      const fetchNotes = async () => {
        try {
          //call backend for db items
          const res = await axios.get("http://localhost:3000/api/");
          setNotes(res.data);
          setIsRateLimited(false);
        } catch (error) {
          console.error("Error fetching notes");
          if (error.response?.status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Something wrong happened");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchNotes();
    },

    [], //empty dependency array means only render once
  );

  return (
    <div className="app-shell">
      {/* check for rate limits */}
      {isRateLimited && <RateLimitedPage />}

      <header className="app-header">
        <Link className="brand" to="/" aria-label="DumpBrain home">
          <span className="brand-mark" aria-hidden="true">
            DB
          </span>
          <span>DumpBrain</span>
        </Link>

        <Link to="/create" className="header-action">
          <Button label="Create note" size="lg" />
        </Link>
      </header>

      <main className="page-frame home-page">
        <section className="page-intro" aria-labelledby="notes-heading">
          <div>
            <p className="eyebrow">Personal workspace</p>
            <h1 id="notes-heading">Notes</h1>
            <p className="intro-copy">
              Capture the thoughts you want to keep close.
            </p>
          </div>
          <div className="notes-count" aria-label="3 notes in this workspace">
            <span className="status-dot" aria-hidden="true" />
            <span>{`${notes.length} notes saved`}</span>
          </div>
        </section>

        <section className="notes-list" aria-label="Saved notes">
          {loading
            ? Array.from({ length: notes.length || 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : notes.map((note) => (
                <Link
                  key={note._id}
                  to={`/note/${note._id}`}
                  className="note-row group"
                >
                  <span
                    className={`note-rail note-rail--green`}
                    aria-hidden="true"
                  />
                  <span className="note-row-content">
                    <span className="note-row-topline">
                      <Badge label="NOTE" size="sm" variant="neutral" />
                      <time>{note.date}</time>
                    </span>
                    <span className="note-title">{note.title}</span>
                    <span className="note-preview">
                      {sliceText(note.content, 100)}
                    </span>
                  </span>
                  <span className="note-arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
