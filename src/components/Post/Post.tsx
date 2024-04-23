import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Post.module.css';
import CodeLanguageIcons from './CodeLanguageIcons';
import { useCategoriesContext } from '../../contexts/usePostProvider/usePostList';



interface Post {
  id: number | null;
  category_id: string;
  content: string;
  title: string;
  imageUrl: string;
  urlsRef: string;
  liveUrl: string;
  sourceCode: string;
  codeLangIcon?: string[] | undefined;
}

interface PostProps {
  postId: number | null;
}

type SingelPostProps  = Post & PostProps

const Post: React.FC<SingelPostProps> = () => {
  const { fetchSingelPost, singelPost } = useCategoriesContext();
  const { id: postId } = useParams();

  const post = singelPost;

  useEffect(() => {
    fetchSingelPost(postId)
  },[])



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
                <div className={styles.codeLanguageWrapper}>
                  <CodeLanguageIcons {...item} />
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
