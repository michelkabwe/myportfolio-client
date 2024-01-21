import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategoriesContext } from '../contexts/usePostProvider/usePostList';
import styles from '../styles/Home.module.css';
import LiInLogo from '../assets/LI-In-Bug.png';
import GitHLogo from '../assets/github-mark.png';
import Austronaut from '../assets/austronaut.png';
import { FaChevronRight } from "react-icons/fa";
import he from 'he';

interface Props {
    showBtn: boolean;
    closeForm: (event: React.MouseEvent<HTMLButtonElement>) => void;

  }
  interface Category {
    category_id: string;
    content:string;
    title:string;
    post_img:string;
  }

type HomeComponent = Category & Props

const Home: React.FC<HomeComponent> = () => {

  const { posts } = useCategoriesContext();

    if(posts !== null && posts ! == undefined){
        console.log(posts,'potssss')
      }



    const heroCategory = posts.filter((post) => {
      return post.category_id  === 'hero';
    })

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

      if (!posts || posts.length === 0) {
        return <div>Loading...</div>; // Or handle the loading state
      }




  return (
    <div className={styles.home_container}>
    <div className={styles.starCluster}>{createStars()}</div>
    <div className={styles.section}>
      <div className={styles.square}></div>
      <div className={styles.col_img}>
      </div>
      <div>

      </div>
      <div className={styles.col_text}>
        {heroCategory.map((item, index) =>
          <div key={index}>
            <h1 className={`${styles.home_title} ${styles.slideInLeft} ${styles.onHoverEffect}`}> {he.decode(item.title.replace(/–/g, "-"))}</h1>
            <p
          className={`${styles.p_home} ${styles.slideInLeft}`}
          dangerouslySetInnerHTML={{ __html: item.content.replace(/&#[^\s]*;|<\/?p>/g, '') }}
        />
          </div>
        )}
        <div className={styles.btn_wrapper_hero}>
          <Link to="Project">
            <button className={styles.purple_btn}>
              <p className={styles.btn_p}>READ MORE</p><FaChevronRight />
            </button>
          </Link>
        </div>
        <div className={styles.social_btn_wrapper_hero}>
          <img src={LiInLogo} alt="Linkedin Logo" className={styles.social_logos_hero} />
          <img src={GitHLogo} alt="Github Logo" className={styles.social_logos_hero} />
        </div>
      </div>

      <div className={styles.austronaut_wrapper}>
        <img src={Austronaut} className={styles.austronaut_img} alt="rocket" />

      </div>
    </div>
  </div>


  )
}

export default Home