import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import MovieData from "./MovieData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleQueryChange(t) {
    setQuery(t);
    if (!t) {
      setMovieData(null);
      setError(null);
    }
  }

  useEffect(() => {
    // Guard: don't fire a fetch on mount with an empty query.
    if (!query) return;

    // Race-condition guard: each effect run gets its own `active` flag.
    // If the user types again before this resolves, the cleanup flips the old flag to false.
    let active = true;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const title = query.toLowerCase().replaceAll(" ", "+");
        const key = import.meta.env.VITE_API_KEY;
        const link = `http://www.omdbapi.com/?t=${title}&apikey=${key}`;

        const res = await fetch(link);
        const data = await res.json();

        // OMDB returns HTTP 200 even when not found — check the body, not just the try/catch.
        if (data.Response === "False") {
          if (active) {
            setError(data.Error || "Movie not found");
            setMovieData(null);
          }
          return;
        }

        if (active) {
          setMovieData({
            title: data.Title,
            year: data.Year,
            genre: data.Genre,
            poster: data.Poster,
          });
        }
      } catch {
        if (active) setError("Something went wrong. Try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    const timer = setTimeout(fetchData, 3000);

    return () => {
      clearTimeout(timer);
      active = false;
    };
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 text-center text-2xl font-semibold tracking-tight">
          Search for a movie and wait a bit!
        </h2>

        <Searchbar value={query} onChange={handleQueryChange} />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Powered by OMDB</CardDescription>
          </CardHeader>

          <CardContent>
            {error && <p className="text-sm text-red-500">{error}</p>}

            {!error && loading && (
              <div className="flex gap-4">
                <Skeleton className="h-40 w-28 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            )}

            {!error && !loading && movieData && (
              <MovieData
                title={movieData.title}
                year={movieData.year}
                genre={movieData.genre}
                poster={movieData.poster}
              />
            )}

            {!error && !loading && !movieData && (
              <p className="text-sm text-muted-foreground">
                Type a title above. The search fires 3 seconds after you stop typing.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
