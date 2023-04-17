import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from "react";
import Upload from './UploadImage';



const Singup = () => {
    return(
        <Container className='content justify-content-center'>
            <Card>
                <Card.Header><Card.Title>Rekisteröidy:</Card.Title></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nimi:</Form.Label>
                            <Form.Control id='name' type='text'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Paikkakunta:</Form.Label>
                            <Form.Control id='city' type='text'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Syntymävuosi:</Form.Label>
                            <Form.Control id='birth' type='number'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control id='email'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Salasana:</Form.Label>
                            <Form.Control id='password' type='password'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kuva:</Form.Label>
                            <Upload />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}


const App = () => {
    return(
        <Singup />
    );
}

export default App;