import React, { useState, useRef, FormEvent } from 'react'
import styles from '../styles/ContactModal.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineDownCircle } from "react-icons/ai";
import emailjs from '@emailjs/browser';



interface PropsCloceForm {
    closeModal: () => void;
}

const ContactModal: React.FC<PropsCloceForm> = ({ closeModal }) => {


    const [validated, setValidated] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) {
            // Handle null case, perhaps throw an error or return early
            return;
          }


        const formValidation = e.currentTarget;
        if (formValidation.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;

        }


        emailjs.sendForm('service_0d9rdmi', 'template_jctpfi5', form.current, 'dhPU_LgOTpMdmO5zK')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        setEmailSent(true)
        setTimeout(() => {
            closeModal();
        }, 2000)
    };
    return (
        <div className={`${styles.modal_container} active`}>
            <div className={styles.btn_wrapper}>
                <AiOutlineDownCircle className={styles.btn_down} onClick={closeModal} />
            </div>
            {!emailSent ? (
                <Form ref={form} onSubmit={sendEmail} noValidate validated={validated} className={styles.form_wrapper} >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required type="text"
                            placeholder="name"
                            name="from_name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required type="email"
                            placeholder="name@example.com"
                            name="to_name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            required as="textarea"
                            rows={3} name="message" />
                    </Form.Group>
                    <Button variant="primary" size="lg" type="submit" className="btn">
                        Submit
                    </Button>
                </Form>) : (

                <div>
                    <h5>Your email has been successfully sent!</h5>
                    <h5>Thank you for reaching out.</h5>
                </div>)}
        </div>
    )
}

export default ContactModal
