import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import styles from '../styles/Post.module.css';


interface PostProps {
  imageUrl: string;
  title: string;
  id: number;
  handleDeletePost: (id: number) => void;
  handlePostClick: (id: number) => void;
  handleDisplayEditPost: any
}

const Post: React.FC<PostProps> = ({
  imageUrl,
  title,
  id,
  handleDeletePost,
  handleDisplayEditPost
}) => {


  const goToEditPost = (id: number) => {
    handleDisplayEditPost(id);
  };


  return (
      <tr key={id} className={styles.tableRow}>
        <td>
          <Image src={imageUrl} alt="Thumbnail" className={styles.dashboardImg} style={{ width: '25px', height: '25px' }} />
        </td>
        <td className={styles.titleColumn} onClick={() => goToEditPost(id)}>
          {title}
        </td>
        <td className={styles.iconColumn}>
          <FaEdit onClick={() => goToEditPost(id)} />
        </td>
        <td className={styles.iconColumn}>
          <FaTrashAlt onClick={() => handleDeletePost(id)} />
        </td>
      </tr>
  );
};

export default Post;
