import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

const ShowDrobdown = (props) =>{
    function getUID()  {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.uid
    }
    if(props.notLogged === true){
        return "";
    }else{
        return(
        <NavDropdown title="Stories">
            <Link to={'/' + getUID() + '/stories'}><NavDropdown.Item as="span" href={'/' + getUID() + '/stories'}>My Stories</NavDropdown.Item></Link>
            <Link to="/stories/new"><NavDropdown.Item as="span" href="/stories/new">New Stories</NavDropdown.Item></Link>
        </NavDropdown>
        );
    }
}

const NavLinks = (props) => {
    let title;
    if (props.notLogged === true){
        title = "Login/Signup"
    } else {
        title = "Logout"
    }
    return(
    <Nav className="me-auto">
        <Link to="/"><Nav.Link as="span" href="/">Home</Nav.Link></Link>
        <Link to="/users"><Nav.Link as="span" href="/users">Users</Nav.Link></Link>
        <ShowDrobdown {...props} />
        <Link to="/authenticate"><Nav.Link as="span" href="/authenticate">{title}</Nav.Link></Link>
      </Nav>
    );
}



const NavItems = (props) => {  
    return(
        <Container fluid>
            <Navbar.Brand href="/">MERN</Navbar.Brand>
            <NavLinks {...props} />
        </Container>
    );
}

const Header = (props) => {
    return(
        <Navbar className="border-4 border-bottom w-100 header" variant="dark">
            <NavItems {...props} />
        </Navbar>
    );
}


  
export default Header;