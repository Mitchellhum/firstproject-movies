import React, { useState } from "react";

import styles from "./Searchbar.module.css";

const Searchbar = (props) => {
  const [searchText, setSearchText] = useState("");

  const searchHandler = (e) => {
    setSearchText(e.target.value);
    props.onSearch(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search for: </label>
      <input
        className={styles.search}
        type="text"
        id="search"
        value={searchText}
        placeholder="Movie title"
        onChange={searchHandler}
      />
    </div>
  );
};

export default Searchbar;
