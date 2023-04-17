import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


const UserRows = () => {
    const [users, setUsers] =  useState([])
    function getYear() {
        return new Date().getFullYear();
    }
    const currentYear = getYear();
    useEffect(() => {
        fetch('http://localhost:5000/api/users')
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData)
            setUsers(responseData)
        }).catch((error) => console.log(error));  
    }, [])

        const listUsers = users.map((user) =>
            <tr>
                <td>{user._id}</td>
                <td><Link to={'/' + user._id + '/stories'} >{user.name}</Link></td>
                <td>{user.city}</td>
                <td>{currentYear - user.birthyear}</td>
            </tr>
        );
        return <tbody>{listUsers}</tbody>
    }


const UserTable = () => {
    return(
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Käyttjän nimi</th>
            <th>Paikkakunta</th>
            <th>Ikä</th>
          </tr>
        </thead>
        <UserRows />
    </Table>        
    );
}

const Users = (props) => {

    return(
        <Container className='content justify-content-center'>
            <Card>
                <Card.Header>
                    <Card.Title>
                        Users
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <UserTable />
                </Card.Body>
            </Card>
        </Container>
    );
}

const App = () => {

        
    return (<Users />);
}

export default App;