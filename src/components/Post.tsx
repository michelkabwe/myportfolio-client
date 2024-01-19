import React, { useState, useEffect } from 'react';
import { useCategoriesContext } from "../contexts/usePostProvider/usePostList";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../styles/Post.module.css';


interface Post {
  [x: string]: any;
  title: string;
  content: string;
  imageUrl?: string;
  item: string;
  id:string;
  //goToPost: (id: string) => void;
}

const Post: React.FC<Post> = () => {
  const { } = useCategoriesContext();
  const { id } = useParams();
  const [post, setPost] = useState<Post[]>([]);

  const navigate = useNavigate();


  const goToPost = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${id}`);
        setPost([response.data]); // Wrap response.data in an array or handle if it's already an array
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
          <div className={styles.postContainer} key={item.id}>
            <div className={styles.textWrapper}>
            <h1 className={styles.postTitle} onClick={ () => goToPost(item.id)}>{item.title}</h1>
            <div className={styles.postImgWrapper}>
            {item.imageUrl && <img src={item.imageUrl} alt="Post" className={styles.postImage} />}
            </div>
            <p className={styles.postContent}>{item.content}</p>
            </div>

          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Post;
