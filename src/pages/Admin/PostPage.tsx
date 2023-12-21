import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import styles from '../../styles/PostPage.module.css'


interface FormData {
  title: string;
  content: string;
}

const PostPage: React.FC = () => {

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();




    try {

      const title = titleRef.current?.value || '';
      const content = contentRef.current?.value || '';
      const selectedCategory = selectRef.current?.value || ''

      console.log(title, content, selectedCategory)

      const response: any = await axios.post<FormData>('http://localhost:3001/api/posts/', {
        title, content, selectedCategory
      })
      console.log(response.data, 'responseee')


    } catch (error) {
      console.error('Error', error)
    }

  }

  return (
    <div className={styles.postpage_container}>
      <h1 style={{ color: 'black' }}>PostPage</h1>
      <Form onSubmit={handleSubmit} style={{ padding: '5rem', height: '100%' }}>
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
        <Form.Control aria-label="Default select example"
          as="select" ref={selectRef}
          className={styles.select_category_wrapper}>
          <option value="">Select category</option>
          <option value="about">about</option>
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