import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      id={props.id}
      className={`${styles.button} ${props.className ? props.className : ""} ${props.isDelete && styles.delete}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
