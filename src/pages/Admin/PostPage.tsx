import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styles from '../../styles/PostPage.module.css';
import { useCategoriesContext } from "../../contexts/usePostProvider/usePostList";




interface FormData {
  createdPost: {
    id: string;
    title: string;
    content: string;
    category_id: string;
    imageUrl: string;
  };
  title: string;
  content: string;
}

const PostPage: React.FC = () => {

  const { titleRef, contentRef, selectRef, handleSubmitPost, handleFileChange } = useCategoriesContext();

  return (
    <div className={styles.postpage_container}>
      <h1 style={{ color: 'black' }}>PostPage</h1>
      <Form onSubmit={handleSubmitPost} style={{ padding: '5rem', height: '100%' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            ref={titleRef}
            placeholder="Add post title"
            className={styles.form_title_area}
          />
          <Form.Text className="text-muted">
            Add a title
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Add text</Form.Label>
          <Form.Control
            as="textarea"
            ref={contentRef}
            placeholder="Add post content"
            className={styles.form_text_area}
          />
        </Form.Group>
        <Form.Group className={styles.file_upload}>
          <Form.Label>Add image</Form.Label>
          <Form.Control
            type='file'
            onChange={handleFileChange}
            accept="image/*"
          />

        </Form.Group>
        <Form.Control aria-label="Default select example"
          as="select" ref={selectRef}
          className={styles.select_category_wrapper}>
          <option value="">Select post category</option>
          <option value="about">about</option>
          <option value="hero"></option>
          <option value="workexperience">workexperience</option>
          <option value="project">project</option>
        </Form.Control>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}


export default PostPage