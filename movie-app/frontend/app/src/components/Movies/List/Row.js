import React from "react";

import styles from "./Row.module.css";

const Row = (props) => {
  //TODO change actors to a list, so that a limit on how much actors are shown in the row can be set without affecting ExpandMovie
  let actorString = props.movie.actors.slice(0, 4).join(", ");

  if (props.movie.actors.length > 4) {
    actorString += " ...";
  }

  const onClickHandler = (e) => {
    if (props.enabled) {
      props.onClose(e);
    } else {
      props.onSelect(props.movie);
    }
  };

  return (
    <>
      <tr
        key={props.movie._id}
        className={`${styles.row} ${props.enabled ? styles.active : ""}`}
        onClick={onClickHandler}
      >
        <td className={styles.data}>{props.movie.title}</td>
        <td className={styles.data}>{actorString}</td>
      </tr>
    </>
  );
};

export default Row;
