import React, { useState } from "react";
import Footer from "./components/elements/Footer";
import Header from "./components/elements/Header";
import Home from "./components/Home";
import Users from "./components/Users";
import Stories from "./components/Stories";
import PostStory from "./components/PostStory";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { Route, Routes } from "react-router-dom";
import useToken from "./components/elements/useToken";

/*Vara auth
const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
*/

//RRD v6 ei tarvitse kuin * perään niin se ohjaa Home elementtiin ellei ole määritettyä tarkempaa reittiä.
// Ei tarvitse redirectiä  tässä tapauksessa erillistä redirectiä
//Käytetään useToken:ia ja setToken:ia kirjautumisen vahvistamiseen ja tokenin hakuun.
const App = () => {
  const { token, setToken } = useToken();
  if (!token) {
    return (
      <div className="App">
        <Header notLogged={true} />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/:uid/stories" element={<Stories />} />
          <Route path="/authenticate" element={<Login setToken={setToken} />} />
        </Routes>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/:uid/stories" element={<Stories />} />
          <Route path="/stories/new" element={<PostStory />} />
          <Route path="/stories/:storyid" element={<PostStory />} />
          <Route path="/authenticate" element={<Logout />} />
        </Routes>
        <Footer />
      </div>
    );
  }
};

export default App;
