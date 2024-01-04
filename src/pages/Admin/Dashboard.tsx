import React, { useEffect } from 'react';
import { useCategoriesContext } from "../../hooks/usePostListContext";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../../styles/Dashboard.module.css';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  imageUrl: string;
}

const Dashboard: React.FC = () => {
  const { posts, handleDeletePost, handlePostClick } = useCategoriesContext();

  return (
    <ListGroup as="ul" className={styles.postListContainer}>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: Post) => (
            <tr key={post.id} className={styles.tableRow} onClick={() => handlePostClick(post.id)}>
              <td><Link to={`http://localhost:3001/api/posts/${post.id}`}>
                <Image src={post.imageUrl} alt="Thumbnail" className={styles.dashboardImg} />
                </Link></td>
              <td className={styles.titleColumn}>{post.title}</td>
              <td className={styles.iconColumn}>
                <FaEdit />
              </td>
              <td className={styles.iconColumn}>
                <FaTrashAlt onClick={() => handleDeletePost(post.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ListGroup>
  )
}

export default Dashboard;
