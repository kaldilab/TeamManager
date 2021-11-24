import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import Scripts from "assets/scripts";
import Head from "settings/Head";
import Container from "layouts/Container";
import Header from "layouts/Header";
import Main from "layouts/Main";
import Footer from "layouts/Footer";

export default function App() {
  Scripts();

  return (
    <React.Fragment>
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <Head />
          <Container>
            <Header />
            <Main />
            <Footer />
          </Container>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}
