import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/StarCluster.module.css'

const StarCluster: React.FC = () => {

  const [hideStars,setHideStars] = useState<boolean>(false);
  const location = useLocation();

  const isProjectsPage = location.pathname === '/Projects'

  const numStars = 100; // Number of stars you want

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      const left = `${Math.random() * 100}%`; // Random left position
      const top = `${Math.random() * 100}%`; // Random top position
      const animationDelay = `${Math.random() * 5}s`; // Random animation delay
      const starStyle = {
        left,
        top,
        animationDelay,
        width: `${Math.random() * 3}px`, // Adjust the star size as needed
        height: `${Math.random() * 3}px`,
      };
      stars.push(
        <div key={i} className={styles.star} style={starStyle}></div>
      );
    }
    return stars;
  };

  return (

    <div className={styles.cluster}>
      { isProjectsPage  ? (null) : (  <> {createStars()} </>)
}

    </div>

  );
}


export default StarCluster;
