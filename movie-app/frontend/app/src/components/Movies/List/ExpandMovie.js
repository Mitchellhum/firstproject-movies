import React from "react";
import Button from "../../UI/Button";
import styles from "./ExpandMovie.module.css";

const ExpandMovie = (props) => {
  let actorString = props.movie.actors.join(", ");

  return (
    <div className={styles.backfall} onDoubleClick={props.onClose}>
      <div className={styles.expandmodal}>
        <header>
          <h2>{props.movie.title}</h2>
          <h4>{actorString}</h4>
        </header>

        <p className={styles.description}>{props.movie.description}</p>
        <div className={styles.buttons}>
          <Button onClick={props.onClose}>Close Window</Button>
          <Button isDelete={true} onClick={props.onDelete}>
            Delete movie
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpandMovie;
