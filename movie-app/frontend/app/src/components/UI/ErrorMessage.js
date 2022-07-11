import React from "react";

import styles from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  return <label className={styles.error}>{props.children}</label>;
};

export default ErrorMessage;
