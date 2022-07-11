import React from "react";
import { useState } from "react";
import ExpandMovie from "./ExpandMovie";
import Button from "../../UI/Button";
import Row from "./Row";

import styles from "./MovieTable.module.css";

const MovieTable = (props) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [moviesPerPage, setMoviesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // handlers
  const selectedMovieHandler = (item) => {
    setSelectedMovie(item);
  };

  const closeMovieWindow = (e) => {
    e.preventDefault();
    setSelectedMovie("");
  };

  const deleteHandler = () => {
    props.onDelete(selectedMovie._id);
    setCurrentPage(1);
    setSelectedMovie("");
  };

  const pageHandler = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  //constants and calculations

  const movieArrayLength = props.movies.length;
  const totalPages = Math.ceil(movieArrayLength / moviesPerPage);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  const currentMovies = props.movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const pageNumberList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumberList.push(i);
  }

  const renderMovies = currentMovies.map((movie) => (
    <Row
      key={movie._id}
      movie={movie}
      enabled={selectedMovie._id === movie._id ? true : false}
      onSelect={selectedMovieHandler}
      onClose={closeMovieWindow}
    />
  ));

  const renderPageNumbers = pageNumberList.map((number) => (
    <Button key={number} id={number} onClick={pageHandler}>
      {number}
    </Button>
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className={styles.header}>Title</th>
            <th className={styles.header}>Actors</th>
          </tr>
        </thead>
        <tbody>{renderMovies}</tbody>
      </table>
      <div className={styles.pagination}>
        {props.movies.length > moviesPerPage && renderPageNumbers}
      </div>

      <div>
        {selectedMovie && (
          <ExpandMovie
            movie={selectedMovie}
            onClose={closeMovieWindow}
            onDelete={deleteHandler}
          />
        )}
      </div>
    </div>
  );
};

export default MovieTable;
