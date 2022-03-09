import React from "react";
import { Row, Col, Layout } from "antd";
const { Header } = Layout;
export default function HeaderPage() {
  return (
    <Header>
      <Row>
        <Col span={24}>col</Col>
      </Row>
    </Header>
  );
}
