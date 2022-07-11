import React, { useState, useEffect } from "react";
import axios from "axios";

import AddMovies from "./components/Movies/addmovies/AddMovies";
import MovieTable from "./components/Movies/List/MovieTable";
import Button from "./components/UI/Button";
import Searchbar from "./components/Movies/search/Searchbar";

import styles from "./App.module.css";

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [movieList, setMovieList] = useState([]);

  // create a filtered list based on the search text
  const filteredList = movieList.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // fetch all movies from database
  const fetchMovies = () => {
    axios.get("http://localhost:8000/").then((result) => {
      if (result.data != null) {
        setMovieList(result.data);
      } else {
        setMovieList([]);
      }
    });
  };

  // handle current search input
  const searchHandler = (value) => {
    setSearchText(value);
  };

  // fetch movies at page render
  useEffect(() => {
    fetchMovies();
  }, []);

  // check if the addnewmovie modal window is supposed to be opened or closed
  const newMovieHandler = (e) => {
    if (isAdding) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };

  // add a new movie with post, fetch movies again afterwards and reset the search input
  const postNewMovie = (props) => {
    axios
      .post("http://localhost:8000/", {
        title: props.title,
        description: props.description,
        actors: props.actors,
        embed: "temp",
      })
      .then(() => fetchMovies());
    setSearchText("");
  };

  // delete a movie by its id to avoid deletion of duplicate titles, fetch recent movie database afterwards
  const deleteMovieHandler = (id) => {
    axios.delete(`http://localhost:8000/${id}`).then(() => {
      fetchMovies();
    });
  };

  // return for rendering
  return (
    <div>
      {isAdding && (
        <AddMovies
          onClick={newMovieHandler}
          onAdd={postNewMovie}
          onCancel={newMovieHandler}
        />
      )}
      <header className={styles.header}>
        <h1>Movies & Series</h1>
        <h3>Review Database</h3>
      </header>
      <div className={styles.content}>
        <div className={styles.output}>
          <Searchbar onSearch={searchHandler} />

          {filteredList.length > 0 ? (
            <MovieTable movies={filteredList} onDelete={deleteMovieHandler} />
          ) : (
            <p>No movies are found</p>
          )}
        </div>
        <Button onClick={newMovieHandler}>New Movie</Button>
      </div>
    </div>
  );
}

export default App;
