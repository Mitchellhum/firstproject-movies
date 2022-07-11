import React from "react";
import Row from "./Row";

const MovieRow = (props) => {
  const FullList = props.movies.map((item) => (
    <Row
      key={item._id}
      movie={item}
      enabled={props.selected._id === item._id ? true : false}
      onSelect={props.onSelect}
      onClose={props.onClose}
    />
  ));

  return <>{FullList}</>;
};

export default MovieRow;
