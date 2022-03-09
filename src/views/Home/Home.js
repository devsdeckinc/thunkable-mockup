import React, { Component } from "react";
import { Layout } from "antd";
import "./../styles.css";
import HeaderPage from "../Header";
import ContentPage from "../Content";
import FooterPage from "../Footer";

class Home extends Component {
  render() {
    return (
      <Layout>
        <HeaderPage />
        <ContentPage />
        <FooterPage />
      </Layout>
    );
  }
}

export default Home;
