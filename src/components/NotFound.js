import React from 'react'
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Loading from './Loading';

const NotFound = () => {
  return (
    <div className={styles.Margin}>
        <Loading src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  )
}

export default NotFound