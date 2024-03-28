import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Post.module.css';
import { FaNode } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { BsBootstrapFill } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

interface Post {
  title: string;
  content: string;
  imageUrl?: string;
  codeLangIcon: string;
  id: string;
  sourceCode: string;
  liveUrl: string;
}

const Post: React.FC<Post> = ({ title, content, imageUrl, codeLangIcon, id, sourceCode, liveUrl }) => {
  const { id: postId } = useParams();
  const [post, setPost] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://myportfolio-backend-ten.vercel.app/api/posts/${postId}`);
        setPost([response.data]);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const renderIcon = (lang: string) => {
    switch (lang) {
      case 'node':
        return <FaNode size={30} color="#fcf55f" />;
      case 'javascript':
        return <IoLogoJavascript size={30} color="#fcf55f" />;
      case 'typescript':
        return <SiTypescript size={26} color="#fcf55f" />;
      case 'firebase':
        return <SiFirebase size={30} color="#fcf55f" />;
      case 'bootstrap':
        return <BsBootstrapFill size={30} color="#fcf55f" />;
      case 'react':
        return <FaReact size={30} color="#fcf55f" />;
      case 'github':
        return <FaGithub size={30} color="#fcf55f" />;
      default:
        return null;
    }
  };

  return (
    <>
      {post.length > 0 ? (
        post.map((item: Post) => (
          <section className={styles.postContainer} key={item.id}>
            <div className={styles.postContentWrapper}>
              <div className={styles.postImgWrapper}>
                {item.imageUrl && <img src={item.imageUrl} alt="Post" className={styles.postImage} />}
              </div>
              <div className={styles.postTextContent}>
                <div className={styles.postTitleWrapper}>
                  <h1 className={styles.postTitle}>{item.title}</h1>
                </div>
                <p className={styles.postContentP}>{item.content}</p>
                <div className={styles.linksWrapper}>
                  <div className={styles.live_url}>
                    <a href={item.liveUrl}>See live</a>
                  </div>
                  <div className={styles.source_code}>
                    <a href={item.sourceCode}>Source code</a>
                  </div>
                </div>
              </div>
              <div className={styles.codeLanguageWrapper}>
                <div className={styles.codeLanguageIcons}>
                  {item.codeLangIcon.split(',').map((lang, index) => (
                    <div key={index} className={styles.codeIcon}>
                      {renderIcon(lang.trim())}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Post;
