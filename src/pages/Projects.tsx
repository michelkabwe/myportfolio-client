import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Projects.module.css";
import { useCategoriesContext } from "../contexts/usePostProvider/usePostList";
import LiInLogo from "../assets/LI-In-Bug.png";
import GitHLogo from "../assets/github-mark.png";
import he from "he";
import { MdOutlineArrowOutward } from "react-icons/md";



const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("About");
  const scrollableRef = useRef(null);

  const { posts } = useCategoriesContext();
  const navigate = useNavigate();

  const goToPost = (id: number) => {
    navigate(`/api/posts/${id}`);

  }

  //To display pdf
  /*const pdfUrl =
    "https://kabwedev.files.wordpress.com/2023/08/michel-kabwe-cv-.pdf";*/

  /* Find specific categories */
  const aboutCategory = posts.filter((post) => {
    return post.category_id === 'about'
  });


  const projectCategory = posts.filter((post) => {
    return post.category_id === 'project'
  });


  const handleScroll = () => {
    const sectionIdsToMonitor = ["about", "project"];

    sectionIdsToMonitor.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        const threshold = 600;

        if (top <= threshold && bottom >= threshold) {
          setActiveCategory(sectionId);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveCategory(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.portfolio_wrapper}
      onScroll={() => handleScroll()}>
      <div className={styles.portfolio_col_wrapper}>
        <div className={styles.portfolio_col_one}>
          <div className={styles.col_one_content}>

            <div className={styles.menu_wrapper}>
              <h5
                className={`${styles.menu_p} ${activeCategory === "about" ? styles.active : ""
                  }`}
                onClick={() => scrollToSection("About")}
              >
                About
              </h5>
              <h5
                className={`${styles.menu_p} ${activeCategory === "project" ? styles.active : ""
                  }`}
                onClick={() => scrollToSection("Project")}
              >
                My projects
              </h5>
            </div>
            <img
              src={LiInLogo}
              alt="Linkedin Logo"
              className={styles.social_logos}
            />
            <img
              src={GitHLogo}
              alt="Github Logo"
              className={styles.social_logos}
            />
          </div>
        </div>
        <div className={styles.portfolio_col_two}>
          <div
            className={styles.col_two_grid}
            style={{
              marginTop: "2rem",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onScroll={() => handleScroll()}
            ref={scrollableRef}>

            {/* About Text */}
            <div id="About" ref={scrollableRef}>
              <div className={styles.card_container}>
                {aboutCategory.map((item, index) => (
                  <div key={index} className={styles.card_col_wrapper}>
                    <div className={styles.card_col_right}>
                      <h5 className={styles.card_title}>
                        {he.decode(item.title.replace(/–/g, "-"))}
                      </h5>
                      <div className={styles.text_wrapper}>
                        <p className={styles.p_about}>
                          {item.content.replace(/<\/?p>/g, "")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="Project" className="project" ref={scrollableRef}>
              <div className={styles.card_container}>
                {projectCategory.map((item, index) => (
                  <div key={index} className={styles.card_col_wrapper}>
                    <div
                      className={`${styles.card_img_wrapper} ${item.imageUrl
                        ? ""
                        : styles.img_wrapper_noBorder
                        }`}
                    >
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="Featured" />
                      )}
                    </div>
                    <div className={styles.card_col_right}>
                      <h5 className={styles.card_title} onClick={() => goToPost(item.id)}>
                        {he.decode(item.title.replace(/–/g, "-"))}
                      </h5>
                      <div className={styles.text_wrapper}>
                        <p className={styles.card_p}>
                          {item.content.length >= 100 ? (
                            <span>
                              {item.content.replace(/<\/?p>/g, "")}
                              <span
                                style={{ color: '#FCF55F', cursor: 'pointer', display:'block', marginTop:'10px' }}
                                onClick={() => goToPost(item.id)}
                              >
                                Read more <MdOutlineArrowOutward style={{ color: '#ffffff', marginLeft: '3px' }} />
                              </span>
                            </span>
                          ) : (
                            <span>
                              {item.content.replace(/<\/?p>/g, "")}
                            </span>
                          )}
                        </p>


                      </div>
                      <div className={styles.links_wrapper}>


                        <div className={styles.live_url}>
                          <a href={item.liveUrl}>See live</a>
                        </div>


                        <div className={styles.source_code}>
                          <a href={item.sourceCode}>Source code</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.tech_logos}>
                </div>
              </div>
            </div>
            {/* <h5 className={styles.view_full_resume}>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                VIEW FULL RESUMÉ
                      </a>
            </h5>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
