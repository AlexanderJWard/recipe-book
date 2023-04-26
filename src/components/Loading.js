import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Loading.module.css";

const Loading = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Loading} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Loading;