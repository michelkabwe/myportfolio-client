import React, { useState, useRef, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

interface Auth {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Auth> = ({ setIsLoggedIn }) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const form = useRef<HTMLFormElement>(null)
    const navigate = useNavigate();

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailValue = emailRef.current?.value;
        const passwordValue = passwordRef.current?.value;

        try {
            const response = []
            const myObject = { email: emailValue, password: passwordValue }
            response.push(myObject);
            console.log(response, 'responseeeee');

            if (emailValue && passwordValue) {
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.getItem('isLoggedIn');
                navigate('/AdminPage');
            }

        } catch (error) {
            console.log(' Error', error);
        }

        emailRef.current!.value = "";
        passwordRef.current!.value = "";
    }

    return (
        <div className={styles.form_wrapper}>
            <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required ref={emailRef} />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required ref={passwordRef} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>




        </div>
    )
}

export default Login