// NOTE See HELP.md in this folder for some useful info & tips

import "./tests.js";
import moviesApi from "./api/moviesApi.js"
import { SearchForm } from './components/searchForm.js';
import { MoviesList } from "./components/moviesList.js";

const { css } = emotion;
const { useEffect, useState } = React;

const mainStyles = css`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-self: center;
  padding: 1rem;
  height: 96%;
  width: 96.5%;
  border-radius: 8px;
  background-color: #fff;
  overflow: scroll;
`;

function customAlphabeticalSort(a, b) {
  const titleA = a.title.toLowerCase().replace(/^[^a-z]+/, ''); // Ignorar números y caracteres especiales al principio
  const titleB = b.title.toLowerCase().replace(/^[^a-z]+/, '');

  return titleA.localeCompare(titleB);
}

function sortMoviesAlphabetically(movies) {
  return [...movies].sort(customAlphabeticalSort);
}

export const App = ({ onLoad }) => {
  const storedMoviesData = localStorage.getItem('movies');
  const storedReviewsData = localStorage.getItem('reviews');

  const initialMoviesData = storedMoviesData ? JSON.parse(storedMoviesData) : [];
  const initialReviewsData = storedReviewsData ? JSON.parse(storedReviewsData) : [];


  const [movies, setMoviesData] = useState(initialMoviesData.map(movie => ({ ...movie, isExpanded: false })));
  const [reviews, setReviewsData] = useState(initialReviewsData)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');


  useEffect(onLoad, []); // to run tests

  useEffect(async () => {
    const fetchData = async () => {
      fetchMoviesData()
      fetchReviewsData()
    }

    if (!movies.length) {
      fetchData()
    }

  }, [])

  const fetchMoviesData = async () => {
    const moviesFetched = await moviesApi.getMovies()
    const sortedMovies = sortMoviesAlphabetically(moviesFetched);

    setMoviesData(sortedMovies.map(movie => ({ ...movie, isExpanded: false })));
    return localStorage.setItem('movies', JSON.stringify(sortedMovies));
  }

  const fetchReviewsData = async () => {
    const reviewsFetched = await moviesApi.getReviews()

    setReviewsData(reviewsFetched);
    return localStorage.setItem('reviews', JSON.stringify(reviewsFetched));
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDecadeChange = (event) => {
    setSelectedDecade(event.target.value);
  };

  const handleRowClick = (movieId) => {
    setMoviesData(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId ? { ...movie, isExpanded: !movie.isExpanded } : movie
      )
    );
  };

  const filteredMovies = movies.filter((element) =>
    element.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMoviesByDecade = selectedDecade
  ? filteredMovies.filter(movie => Math.floor(movie.year / 10) * 10 === parseInt(selectedDecade))
  : filteredMovies;

  return html`
    <main className=${mainStyles}>

      <h1>Movies Evan Likes!</h1>
      <p> Below is a comprehensive list of movies evan really likes. </p>

      <${SearchForm}
        movies=${movies}
        handleSearchChange=${handleSearchChange}
        handleDecadeChange=${handleDecadeChange}
        searchTerm=${searchTerm}
        selectedDecade=${selectedDecade}
      />

      <${MoviesList}
        reviews=${reviews}
        handleRowClick=${handleRowClick}
        filteredMoviesByDecade=${filteredMoviesByDecade}
      />
    </main>
  `;
};
