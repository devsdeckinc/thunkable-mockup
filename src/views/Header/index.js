import React from "react";
import { Layout, Avatar, Typography } from "antd";
import styles from "../styles";
import "./../styles.css";

const { Header } = Layout;
export default function HeaderPage() {
  return (
    <Header className="header-container" style={styles.header}>
      <div>
        <Avatar
          style={styles.logo}
          src={
            "https://aws1.discourse-cdn.com/business4/uploads/thunkable/original/3X/0/f/0f59f292712368bce16ff80133ae10de8a6f27e8.png"
          }
        />
      </div>
      <div className="subheader">
        <Typography className="primary-text">My Projects</Typography>
      </div>
    </Header>
  );
}
