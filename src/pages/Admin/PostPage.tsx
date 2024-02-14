import React, { useState, useRef, ReactElement } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/PostPage.module.css';
import { useCategoriesContext } from "../../contexts/usePostProvider/usePostList";
import { FaNode } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { BsBootstrapFill } from "react-icons/bs";
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { JsxElement } from 'typescript';


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

interface TechIcon {
  value: string;
  component?: React.ReactNode;
}

const PostPage: React.FC<TechIcon> = () => {

  const { titleRef, contentRef, selectRef, sourceCodeRef, liveUrlRef, handleSubmitPost, handleFileChange } = useCategoriesContext();



  const techIcons: TechIcon[] = [
    { value: 'node', component: <FaNode /> },
    { value: 'javascript', component: <IoLogoJavascript /> },
    { value: 'typescript', component: <SiTypescript /> },
    { value: 'firebase', component: <SiFirebase /> },
    { value: 'bootstrap', component: <BsBootstrapFill /> },
    { value: 'react', component: <FaReact /> },
    { value: 'github', component: <FaGithub /> },
  ];

  const [selectedIcon, setSelectedIcon] = useState<TechIcon[]>([]);



  const selectIcon = (icon: any) => {
    setSelectedIcon(icon);
    console.log(icon, 'selected icon ');

    const updatedItem = [...selectedIcon, icon];

    setSelectedIcon(updatedItem);
    console.log(updatedItem,'updated')

    console.log([...updatedItem],'OOOOOO');


};



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
        <Form.Group className={styles.add_link}>
          <Form.Label>Add Live site</Form.Label>
          <Form.Control
            ref={liveUrlRef}
            type='url'
            placeholder='See live'
          />
        </Form.Group>
        <Form.Group className={styles.add_link}>
          <Form.Label>Add Source code</Form.Label>
          <Form.Control
            ref={sourceCodeRef}
            type='url'
            placeholder='Source code'
          />
        </Form.Group>
        <Form.Control aria-label="Default select example"
          as="select" ref={selectRef}
          className={styles.select_category_wrapper}>
          <option value="">Select post category</option>
          <option value="about">about</option>
          <option value="hero">hero</option>
          <option value="workexperience">workexperience</option>
          <option value="project">project</option>
        </Form.Control>

        <div className={styles.tech_icons} style={{ display: 'flex', fontSize: '1.5rem' }}>
          {techIcons.map((iconItem:any) => {
            return (
              <div key={iconItem.value} onClick={() => selectIcon(iconItem.value)}>
                {iconItem.component}
              </div>

            )
          })}
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}



export default PostPage