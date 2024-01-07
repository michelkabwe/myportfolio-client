import React, { useEffect } from 'react';
import { useCategoriesContext } from "../../contexts/usePostProvider/usePostList";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../../styles/Dashboard.module.css';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostList from '../../components/PostList';

interface PostItems {
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
          {posts.map((post: PostItems) => (
            <PostList
              key={post.id}
              imageUrl={post.imageUrl}
              title={post.title}
              handlePostClick={handlePostClick}
              handleDeletePost={handleDeletePost} id={post.id} />
          ))}
        </tbody>
      </Table>
    </ListGroup>
  )
}

export default Dashboard;
