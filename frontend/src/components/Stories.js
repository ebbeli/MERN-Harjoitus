import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';
import Modal from './elements/Modal';
import { useParams } from 'react-router-dom';
import PostStory from './PostStory';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

//Lisää edit modaliin tai muuten
function getUID() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken //? deleted from end
}

const StoriesButtons = ({author, storyId}) => {
    let userToken = getUID(); 
        if(userToken?.token && userToken?.uid=== author){
            return( <><Link to={'/stories/' + storyId}><Button varian="primary">Edit</Button></Link><Button>Delete</Button></> );
        }else{
            return null;
        }
}

const StoriesRows = (props) => {
    const [show, setShow] = useState(false);
    function toggleModal(){
        setShow(!show);
    }
    //Alla luodaan table elementin sisältö ja joka riville oma modal elementti jolle passataan funktion statet ja samalla luodaan sisältö children parametrille
    const listStrories = props.data.map((story) =>
    <>
        <Modal show={show} setShow={setShow}>
            <p>PVM: {story.date}</p>
            <p>Paikkakunta: {story.city}</p>
            <p>Tarina: {story.story}</p>
            <StoriesButtons author={story.uid} storyId={story.id} />
        </Modal>
        <tr onClick={toggleModal}>
            <td>{story.date}</td>
            <td>{story.city}</td>
            <td>{story.story}</td>
            <td style={{textAlign: 'center'}}><Image roundedCircle height='50' widht="50" src=" https://picsum.photos/100/100"/></td>
        </tr>
    </>
    );
    return <tbody>{listStrories}</tbody>
}

const StoriesTable = (props) => {
    return(
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pvm</th>
            <th>Kohde</th>
            <th>Tarinateksti</th>
            <th>Kuva</th>
          </tr>
        </thead>
        <StoriesRows data={props.data} />
    </Table>        
    );
}

const Stories = (props) => {
    if(props.found === false){
        return(
        <Container className='content justify-content-center'>
            <Card>
                <h2 style={{textAlign: 'center'}}>Käyttäjällä ei ole tarinoita.</h2>
            </Card>
        </Container>
        )
    }else {
        return(
            <Container className='content justify-content-center'>
                <Card>
                    <Card.Header>
                        <Card.Title>{props.name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <StoriesTable data={props.data} />
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

const App = () => {
    const DATA = [
        { "uid": "62fa2ebc0fa49e3840a9dbd1", "id": 1 , "story" : "Oli kivaa", "name" : "Eino Rissanen", "date" : "22.5.2022", "city" : "Siilinjärvi"},
          { "uid": "62fa2ebc0fa49e3840a9dbd1", "id": 2 , "story" : "Jee Jee!", "name" : "Eino Rissanen", "date" : "11.6.2022", "city" : "Paikka"},
          { "uid": "62fa2ebc0fa49e3840a9dbd1", "id": 3 , "story" : "Jos sul lysti on!", "name" : "Eino Rissanen", "date" : "30.12.1993", "city" : "Kuopio"},
          { "uid": "62fa2dd3ea1ec41dec209758", "id": 4 , "story" : "Olipa Kerran!", "name" : "Anni Matikainen", "date" : "30.12.1993", "city" : "Oulu"} 
      
        ];

    const { uid } = useParams();
    let found = false;
    let userArray = [];
    let name = "";
    for (let i in DATA){
        if(DATA[i].uid === uid){
            userArray.push(DATA[i]);
            name = DATA[i].name;
            found = true;
        }
    }

    return(
        <Stories data={userArray} name={name}  found={found}/>
    );
}

export default App;