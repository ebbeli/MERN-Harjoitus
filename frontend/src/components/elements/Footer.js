import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'





const Footer = () => {
    return(
    <Container className="border-4 border-top justify-content-center footer" variant="dark" fluid>
        <Row className='justify-content-center'>
            <h6 className='justify-content-center'>Mern-kesäkurssi 2022, Savonia AMK<br/></h6>
        </Row>
        <Row className='justify-content-center'>
            <h6 className='justify-content-center'>Tekijä: <b>Eino Rissanen</b></h6>
        </Row>    
    </Container>

    );
}

export default Footer;