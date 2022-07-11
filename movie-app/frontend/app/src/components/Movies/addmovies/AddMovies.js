import React, { useState } from "react";
import Button from "../../UI/Button";
import ErrorMessage from "../../UI/ErrorMessage";

import styles from "./AddMovies.module.css";

const AddMovies = (props) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieActor, setMovieActor] = useState("");
  const [actorsList, setActorList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  let actorString = "";

  if (actorsList.length > 0) {
    actorString = actorsList.join(", ");
  }

  // handlers for all the input fields
  const titleHandler = (e) => {
    setMovieTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setMovieDescription(e.target.value);
  };

  const actorHandler = (e) => {
    let string = e.target.value;
    setMovieActor(string.charAt(0).toUpperCase() + string.slice(1));
  };

  // ask the user to add actors to a list so that it can output in a specified format
  const addActorToList = (e) => {
    if (e.keyCode === 13) {
      if (movieActor.trim().length === 0) {
        setErrorMessage("No actors were entered in the form.");
        return;
      } else if (actorsList.length < 1 && movieActor.trim().length > 0) {
        setActorList([movieActor]);
      } else if (movieActor.trim().length > 0) {
        setActorList([...actorsList, movieActor.trim()]);
      }
      setMovieActor("");
      setErrorMessage("");
    }
  };

  // once submit is pressed, remove excess spaces and send back to parent
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      movieTitle.trim().length === 0 ||
      movieDescription.trim().length === 0 ||
      actorsList.length === 0
    ) {
      setErrorMessage("Please fill all forms correctly.");
    } else {
      props.onAdd({
        title: movieTitle,
        description: movieDescription,
        actors: actorsList,
      });

      setMovieTitle("");
      setMovieDescription("");
      setMovieActor("");
      setActorList([]);
      setErrorMessage("");
      props.onCancel();
    }
  };
  // onClick isnt ideal for backfall, since this will trigger once a mouse is released, too.
  // fix in the future
  return (
    <div className={styles.backfall} onDoubleClick={props.onCancel}>
      <div className={styles.moviemodal}>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : ""}

        <header className={styles.header}>
          <h2>Add a new movie</h2>
        </header>
        <div className={styles.inputfields}>
          <div>
            <label htmlFor="movieTitle" className={styles.label}>
              Movie Title
            </label>
            <input
              type="text"
              id="movieTitle"
              value={movieTitle}
              onChange={titleHandler}
              className={styles.input}
            />

            <label htmlFor="movieDescription" className={styles.label}>
              Description
            </label>
            <textarea
              id="movieDescription"
              value={movieDescription}
              onChange={descriptionHandler}
              className={styles.textfield}
            />
          </div>

          <div>
            <label htmlFor="movieActor" className={styles.label}>
              Actors
            </label>
            <input
              type="text"
              id="movieActor"
              value={movieActor}
              onChange={actorHandler}
              onKeyUp={addActorToList}
              className={styles.input}
            />

            <label htmlFor="actors" className={styles.label}>
              Currently added actors:
            </label>
            {actorsList.length > 0 ? (
              <p id="actors" className={styles.actors}>
                {actorString}
              </p>
            ) : (
              <p id="actors" className={styles.text}>
                No actors are currently added (enter to add)
              </p>
            )}

            {/* <Button type="button" onClick={addActorToList}>
                Add Actor To List
              </Button> */}
          </div>

          <Button type="button" onClick={submitHandler}>
            Add Movie
          </Button>
          <Button type="button" onClick={props.onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMovies;
