import React, { useState } from "react";
import Upload from './UploadImage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'

const RegisterUser = async (user) => {
    return  await axios.post('http://localhost:5000/api/users/signup', {
    email: user.mail,
    password: user.password,
    name: user.name,
    city: user.city,
    birthyear: user.year,
    picurl: user.pic
})
.then((response) => {console.log(response)
window.location.replace("/");} )
.catch((error) => {
    console.log(error);
})    
}

const Register = () => {
    const [mail, setMail] = useState("esimerkki@nimi.on")
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [city, setCity] = useState()
    const [year, setYear] = useState()
    const [pic, setPic] = useState()
    const HandleSignup = async( e ) => {
        e.preventDefault();
        await RegisterUser({
            mail,
            password,
            name,
            city,
            year,
            pic
        })
    }
    return(
        <Form onSubmit={HandleSignup}>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" onChange={e => setMail(e.target.value)}/>
                <Form.Text muted>Kirjautumis tunnuksesi.</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Salasana:</Form.Label>
                <Form.Control type='password' onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Nimi:</Form.Label>
                <Form.Control type='text' onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Paikkakunta:</Form.Label>
                <Form.Control type='text' onChange={e => setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Syntymävuosi:</Form.Label>
                <Form.Control type='number' onChange={e => setYear(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Kuva:</Form.Label>
                <Form.Control type='text' onChange={e => setPic(e.target.value)}/>
                <Form.Text muted>Kuva ei lataudu vielä palvelimelle, joten käytä url:ia.</Form.Text>
                <Upload />
            </Form.Group>
            <Button type='submit' style={{float: 'left'}}>Register</Button>
        </Form>
    );
}

export default Register;