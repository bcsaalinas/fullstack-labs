import { useState, useEffect } from "react";
import { movieIDs } from "./movies";
import Movie from "./Movie";

function App() {
  const [movieID, setMovieID] = useState(null);
  const [movieData, setMovieData] = useState({
    title: null,
    year: null,
    image: null,
    authors: null,
    director: null,
    plot: null,
  });

  function generateID() {
    //generate a random index of the array
    let random = Math.floor(Math.random() * movieIDs.length);

    const id = movieIDs[random];
    setMovieID(id);
  }

  //generate a movie using effect hook
  useEffect(() => {
    let active = true;

    async function fetchData() {
      if (!movieID) return;

      const key = import.meta.env.VITE_API_KEY;

      //hit the api with the generated movie ID
      const link = `http://www.omdbapi.com/?i=${movieID}&apikey=${key}&p=long`;
      console.log(link);
      if (active) {
        let res = await fetch(link);
        const data = await res.json();
        console.log(data);

        //grab the title and year from the selected movie
        const movieTitle = data.Title;
        const movieYear = data.Year;
        console.log(data.Genre);

        const imgLink = `https://img.omdbapi.com/?apikey=${key}&i=${movieID}`;
        let img = await fetch(imgLink);
        const imgData = await img;
        let imageUrl = imgData.url;
        imageUrl = imageUrl.slice(0);

        //update the movieData object with the info from the api response
        setMovieData({
          title: movieTitle,
          year: movieYear,
          image: imageUrl,
          genre: data.Genre,
          director: data.Director,
          runtime: data.Runtime,
          rating: data.imdbRating,
          plot: data.Plot,
        });
      }
    }
    fetchData();

    //cleanup function
    return () => {
      //return false in case the component unmounts before the fetch is complete
      active = false;
    };
  }, [movieID]);

  return (
    <>
      <div className="container">
        <div className="main-card">
          <div className="text-wrapper">
            <h1>Get a new movie to watch</h1>
          </div>
          <p>From fan favorites to underground masterpieces!</p>
          <button
            data-button-009=""
            className="button-009"
            onClick={generateID}
          >
            <span className="button-009__inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="button-009__icon is--left"
              >
                <path
                  d="M14 19L21 12L14 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                ></path>
                <path
                  d="M21 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                ></path>
              </svg>
              <span className="button-009__text">Surprise me!</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="button-009__icon is--right"
              >
                <path
                  d="M14 19L21 12L14 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                ></path>
                <path
                  d="M21 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                ></path>
              </svg>
            </span>
            <span className="button-009__bg"></span>
          </button>

          {/* convert the keys of the object to an array, for every key check if its not null  */}
          {/* .values converts the values of an object to an array  */}
          {/* .every checks if all elements in the array pass the test  */}
          {Object.values(movieData).every((key) => key !== null) && (
            <Movie
              title={movieData.title}
              year={movieData.year}
              imageUrl={movieData.image}
              genre={movieData.genre}
              director={movieData.director}
              runtime={movieData.runtime}
              rating={movieData.rating}
              plot={movieData.plot}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
