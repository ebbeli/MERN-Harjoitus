import React, { useState, useEffect, useContext, createContext } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Register from './elements/Register';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*
varmista ominaisuus
import PropTypes from "prop-types";
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
*/
const UserContext = createContext();

const LoginUser = async (credentials) => {
return fetch('http://localhost:5000/api/users/login', {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    }
})
    .then(data => data.json());
}
   

const Login = () => {
const setToken = useContext(UserContext)
const [username, setUserName] = useState()
const [password, setPassword] = useState()


const HandleSubmit = async e => {
    e.preventDefault();
    const token = await LoginUser({
      username,
      password
    })
    setToken(token)
    window.location.replace("/")
  }
    return(
        <Form onSubmit={null}>
            <Form.Group>
                <Form.Label>Käyttäjänimesi:</Form.Label>
                <Form.Control type='text' onChange={e => setUserName(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasanasi: </Form.Label>
                <Form.Control type='passwords' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button onClick={HandleSubmit} style={{float: 'left'}}>Login</Button>
        </Form>
    )
}

//Päivitetään Form, buttonin sisältö ja otsikko
const LoginOrRegister = () => {
    const [forms, setForms] = useState()
    const [buttonText, setButton] = useState()
    const [title, setTitle] = useState()
    const [toLogin, setToLogin] = useState(true)//Tunnistetaan ollaanko avaamassa login vai register

    useEffect(() => {
    let cardTitle, buttonTitle, toCall
        if (toLogin === true){ //Vaihdettavat arvot. Avattattessa sivu toLogin=true ja Loginin ladattavat arvot jne
            cardTitle = "Login"
            buttonTitle = "To Register"
            toCall = <Login />
        }else{
            cardTitle = "Register" 
            buttonTitle = "To Login"
            toCall = <Register />
        } 
        setForms(toCall); // Päivitetään arvot lopuksi
        setButton(buttonTitle);
        setTitle(cardTitle);
    }, [toLogin] )

    return(
        <Card>
            <Card.Header><Card.Title>{title}</Card.Title></Card.Header>
            <Card.Body>
                {forms}
                <Button style={{float: 'right'}} onClick={() => setToLogin(setBoolean => !setBoolean)}>{buttonText}</Button>
            </Card.Body>
        </Card>
    );
}


const App = (props) => {
    return(
        <Container className='content justify-content-center'>
            <UserContext.Provider value={props.setToken}>
                <LoginOrRegister />
            </UserContext.Provider>
        </Container>
    );
}

export default App;