import React, { Component } from "react";

import { Layout, Typography } from "antd";
import styles from "../styles";
import "./../styles.css";

const { Footer } = Layout;

export default class FooterPage extends Component {
  render() {
    return (
        <Footer>
            <Typography.Paragraph>Created by <a href="samraj.fyimad.com">Samraj Soundarajan</a></Typography.Paragraph>
        </Footer>
    )
  }
}
