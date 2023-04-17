import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

const StoriesDisplay = (props) => {
  const DATA = [
    { story: "Oli kivaa", name: "Eino Rissanen", date: "22.5.2022", place: "Siilinjärvi"},
    { story: "Jee Jee!", name: "Matti Meikäläinen", date: "11.6.2022", place: "Paikka"}
  ];
  return(
  <Card style={{textAlign: 'center'}} >
    <Card.Header>
      <Card.Title>{DATA[props.x].place} {DATA[props.x].date}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {DATA[props.x].story}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
        {DATA[props.x].name}
    </Card.Footer>
  </Card>
  )
}
const WelcomeCard = () => {
  return <Card style={{textAlign: 'center'}} >
  <Card.Header>
    <h2>Pyöräretkemme</h2>
  </Card.Header>
  <Card.Body className='justify-content-center'>
    <Card.Text>
      Tervetuloa tutustumaan seuramme jäsenten pyöräretkiin!
    </Card.Text>
    <Image roundedCircle height='200' src=" https://picsum.photos/100/100"/>
  </Card.Body>
</Card>
}

const Home = () => {
  return(
  <Container className='content justify-content-center'>
    <Row>
      <Col>
      <WelcomeCard />
      </Col>
    </Row>
    <Row className='justify-content-center' style={{paddingTop: '1%'}}>
      <Col>
      <StoriesDisplay x='0'/>
      </Col>
      <Col>
      <StoriesDisplay x='1' />
      </Col>
    </Row> 
  </Container>
  );
}


export default Home;
