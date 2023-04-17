import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React from "react";

const Logout = () => {
    function removeToken() {
        localStorage.removeItem('token');
        window.location.replace("/");
    }
    return(
        <Container className='content justify-content-center'>
            <Card>
                <Card.Header><Card.Title>Logout</Card.Title></Card.Header>
                <Card.Body><Button onClick={removeToken}>Logout</Button></Card.Body>
            </Card>
        </Container>
    );
}


const App = () => {
    return(
        <Logout /> 
    );
}

export default App;