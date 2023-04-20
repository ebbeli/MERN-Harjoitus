import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Modal from "./elements/Modal";
import { Navigate, useParams } from "react-router-dom";
import PostStory from "./PostStory";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { ip } from "../ip.js";
import axios from "axios";

//Lisää edit modaliin tai muuten
function getUID() {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken; //? deleted from end
}

const StoriesButtons = ({ author, storyId }) => {
  console.log(storyId);
  let asd = "";
  asd = storyId.toString();
  console.log(asd);
  const deleteStory = async (storyId) => {
    return await axios
      .post(ip + "/api/stories/delete/", {
        id: asd,
      })
      .then((response) => {
        console.log(response);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let userToken = getUID();
  if (userToken?.token && userToken?.uid === author) {
    return (
      <>
        <Link to={"/stories/" + storyId}>
          <Button varian="primary">Edit</Button>
        </Link>
        <Button onClick={deleteStory}>Delete</Button>
      </>
    );
  } else {
    return null;
  }
};

const StoriesRows = (props) => {
  const [show, setShow] = useState(false);
  function toggleModal() {
    setShow(!show);
  }
  //Alla luodaan table elementin sisältö ja joka riville oma modal elementti jolle passataan funktion statet ja samalla luodaan sisältö children parametrille
  const listStrories = props.data.map((story) => (
    <>
      <Modal show={show} setShow={setShow}>
        <p>PVM: {story.date}</p>
        <p>Paikkakunta: {story.city}</p>
        <p>Tarina: {story.story}</p>
        <StoriesButtons author={story.uid} storyId={story._id} />
      </Modal>
      <tr onClick={toggleModal}>
        <td>{story.date}</td>
        <td>{story.city}</td>
        <td>{story.story}</td>
        <td style={{ textAlign: "center" }}>
          <Image
            roundedCircle
            height="50"
            widht="50"
            src=" https://picsum.photos/100/100"
          />
        </td>
      </tr>
    </>
  ));
  return <tbody>{listStrories}</tbody>;
};

const StoriesTable = (props) => {
  return (
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
};

const Stories = (props) => {
  if (props.found === false) {
    return (
      <Container className="content justify-content-center">
        <Card>
          <h2 style={{ textAlign: "center" }}>Käyttäjällä ei ole tarinoita.</h2>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container className="content justify-content-center">
        <Card>
          <Card.Header>
            <Card.Title>{props.data[0].name}</Card.Title>
          </Card.Header>
          <Card.Body>
            <StoriesTable data={props.data} />
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

const App = () => {
  const [stories, setStories] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const { uid } = useParams();
  console.log(uid);
  let DATA;
  let storyArray = [];
  console.log("storyArray");
  console.log(storyArray);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    fetch(ip + "/api/stories")
      .then((response) => response.json())
      .then((responseData) => {
        DATA = responseData;
        for (let i in DATA) {
          let story = {};
          if (DATA[i].user.id === uid) {
            story.name = DATA[i].user.name;
            story.uid = DATA[i].user.id;
            story._id = DATA[i]._id;
            story.story = DATA[i].story;
            story.date = DATA[i].date;
            story.picurl = DATA[i].picurl;
            story.city = DATA[i].city;
            storyArray.push(story);
            setFound(true);
          }
        }
        console.log(responseData);
        setStories(storyArray);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  if (isLoading) {
    return (
      <Container className="content justify-content-center">
        <Card>
          <h2 style={{ textAlign: "center" }}>Lataa..</h2>
        </Card>
      </Container>
    );
  }
  return <Stories data={stories} found={found} />;
};

export default App;
