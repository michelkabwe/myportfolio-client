import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import styles from '../styles/Post.module.css';

interface PostProps {
  imageUrl: string;
  title: string;
  id: number;
  handleDeletePost: (id: number) => void;
  handlePostClick: (id: number) => void;
}

const Post: React.FC<PostProps> = ({
  imageUrl,
  title,
  id,
  handleDeletePost,
  handlePostClick,
}) => {
  return (
    <tr key={id} className={styles.tableRow} onClick={() => handlePostClick(id)}>
      <td>
        <Link to={`http://localhost:3001/api/posts/${id}`}>
          <Image src={imageUrl} alt="Thumbnail" className={styles.dashboardImg} />
        </Link>
      </td>
      <td className={styles.titleColumn}>{title}</td>
      <td className={styles.iconColumn}>
        <FaEdit />
      </td>
      <td className={styles.iconColumn}>
        <FaTrashAlt onClick={() => handleDeletePost(id)} />
      </td>
    </tr>
  );
};

export default Post;
