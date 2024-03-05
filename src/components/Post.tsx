import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Post.module.css';


interface Post {
  [x: string]: any;
  title: string;
  content: string;
  imageUrl?: string;
  item: string;
  id: string;
  sourceCode: string;
  liveUrl: string;
}

const Post: React.FC<Post> = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post[]>([]);

  const navigate = useNavigate();


  const goToPost = (postId: string) => {
    navigate(`/api/posts/${postId}`);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://myportfolio-backend-ten.vercel.app/api/posts/${id}`);
        setPost([response.data]);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <>
      {post.length > 0 ? (
        post.map((item: Post) => (
          <section className={styles.postContainer} key={item.id}>
            <div className={styles.textWrapper}>
              <div className={styles.postContentWrapper}>
                <div className={styles.postImgWrapper}>
                  <div>
                    <h1 className={styles.postTitle} onClick={() => goToPost(item.id)}>{item.title}</h1>
                  </div>

                  {item.imageUrl && <img src={item.imageUrl} alt="Post" className={styles.postImage} />}
                </div>
                <div className={styles.postContent}>
                  <p className={styles.postContentP}>{item.content}</p>
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