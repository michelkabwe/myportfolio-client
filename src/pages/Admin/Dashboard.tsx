import React from 'react'
import { useCategoriesContext } from "../../hooks/usePostListContext";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../../styles/Dashboard.module.css';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';


interface Post {
  title: string;
  imageUrl: string;
}



const Dashboard: React.FC = () => {

  const posts: Post[] = useCategoriesContext();

  return (
    <ListGroup as="ul" className={styles.postListContainer}>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: Post, index: number) => (
            <tr key={index} className={styles.tableRow}>
              <td><Image src={post.imageUrl} alt="Thumbnail" className={styles.dashboardImg} /></td>
              <td className={styles.titleColumn}>{post.title}</td>
              <td className={styles.iconColumn}>
                <FaEdit />
              </td>
              <td className={styles.iconColumn}>
                <FaTrashAlt />
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </ListGroup>

  )
}

export default Dashboard