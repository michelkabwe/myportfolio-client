import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoriesContext } from "../../contexts/usePostProvider/usePostList";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '../../styles/Dashboard.module.css';
import Table from 'react-bootstrap/Table';
import PostList from '../../components/PostList';


interface PostItems {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  category_id: string;
  liveUrl: string;
  sourceCode: string;
}






const Dashboard: React.FC = () => {
  const { titleRef, contentRef, selectRef, sourceCodeRef, liveUrlRef, posts, handleDeletePost, handlePostClick, handleSubmitPostUpdate, handleFileChange, fetchPosts } = useCategoriesContext();
  const navigate = useNavigate();
  const { id: editPostId } = useParams();
  const actualEditPostId: string = editPostId || '';


  const [displayEditPost, setDisplayEditPost] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  },[])


  const handleDisplayEditPost = (id: number) => {
    setDisplayEditPost(true);
    navigate(`/api/posts/${id}/edit`);
  }

  const handleFormSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmitPostUpdate(event, actualEditPostId);
  };


  return (
    !displayEditPost ? (
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
                handleDeletePost={handleDeletePost} id={post.id}
                handleDisplayEditPost={handleDisplayEditPost} />
            ))}
          </tbody>
        </Table>
      </ListGroup>
    ) : (
      <div>
        {posts.length > 0 ? (
          posts
            .filter((item: PostItems) => item.id.toString() === editPostId)
            .map((item: PostItems) => (
              <section className={styles.post_edit_Container} key={item.id}>
                <div className={styles.text_edit_Wrapper}>
                  <Form onSubmit={handleFormSubmitEdit} className={styles.form_edit} style={{ padding: '5rem', height: '100%' }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        ref={titleRef}
                        placeholder="Add post title"
                        className={styles.form_title_Area}
                        defaultValue={item.title}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Text</Form.Label>
                      <Form.Control
                        as="textarea"
                        ref={contentRef}
                        placeholder="Add post content"
                        className={styles.form_text_area}
                        defaultValue={item.content}
                      />
                    </Form.Group>
                    <Form.Group className={styles.file_upload}>
                      <div className={styles.edit_image_Wrapper}>
                        <img className={styles.edit_image_Wrapper} src={item.imageUrl} />
                      </div>
                      <Form.Label>Change image</Form.Label>
                      <Form.Control
                        type='file'
                        onChange={handleFileChange}
                        accept="image/*"
                      />


                    </Form.Group>
                    <Form.Group className={styles.add_link}>
                      <Form.Label>Add Live site</Form.Label>
                      <Form.Control
                        ref={liveUrlRef}
                        type='url'
                        placeholder='See live'
                        defaultValue={item.liveUrl}
                      />
                    </Form.Group>
                    <Form.Group className={styles.edit_link}>
                      <Form.Label>Edit Source code</Form.Label>
                      <Form.Control
                        ref={sourceCodeRef}
                        type='url'
                        placeholder='Source code'
                        defaultValue={item.sourceCode}
                      />
                    </Form.Group>
                    <Form.Control aria-label="Default select example"
                      as="select"
                      ref={selectRef}
                      className={styles.select_category_Wrapper}
                      value={item.category_id}>
                      <option value="">Select post category</option>
                      <option value="about">about</option>
                      <option value="hero">hero</option>
                      <option value="workexperience">workexperience</option>
                      <option value="project">project</option>
                    </Form.Control>

                    <Button variant="primary" type="submit" className={styles.submit_edit_Btn}>
                      Submit
                    </Button>
                  </Form>

                </div>

              </section>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

    )
  )
}

export default Dashboard;
