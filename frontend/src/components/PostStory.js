import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Upload from './elements/UploadImage';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function getUID() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken.uid;
}

const getUser = async () => {
    const uid = getUID();
    console.log(uid)
    const url = 'http://localhost:5000/api/users/' + uid  
    return axios.get(url)
    .then((res) => console.log(res))
    .catch((err) => console.log.apply(err))
}

const PostNewStory = async (story) => {
    let user2 = getUser();
    return await axios.post('http://localhost:5000/api/stories/', {
    story: story.newStory,
    date: story.date,
    city: story.city,
    picurl: story.pic,
    user: user2
})
.then((response) => {console.log(response)
window.location.replace("/");} )
.catch((error) => {
    console.log(error);
})    
}

const StoryForm = (props) => {
    const [date, setDate] = useState()
    const [city, setCity] = useState()
    const [newStory, setNewStory] = useState()
    const [pic, setPic] = useState()


    const HandlePost = async( e ) => {
        e.preventDefault();
        await PostNewStory({
            newStory,
            date,
            city,
            pic,  
        })
    }
    const story = props.story;
    return(
        <Form>
            <Form.Group>
                <Form.Label>Pvm:</Form.Label>
                <Form.Control type='date' onChange={e => setDate(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Paikkakunta:</Form.Label>
                <Form.Control type='text' onChange={e => setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Tarinateksti:</Form.Label>
                <Form.Control type='textarea' onChange={e => setNewStory(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type='text' onChange={e => setPic(e.target.value)}/>
                <Form.Text muted>Kuva ei lataudu vielä palvelimelle, joten käytä url:ia.</Form.Text>
                <Form.Label>Lataa kuva:</Form.Label>
                <Upload />
            </Form.Group>
            <Button onClick={HandlePost} >Submit</Button>
        </Form>
    );
}

const StoryCard = (props) => {
    return(
    <Card>
        <Card.Header>
            <Card.Title>Post new story</Card.Title>
        </Card.Header>
        <Card.Body>
            <StoryForm/>
        </Card.Body>
    </Card>
    );
}


const App = () => {
    //Alempi testi datan hakua varten
    return(
        <Container className='content justify-content-center'>
            <StoryCard />
        </Container>
    );
}

export default App;