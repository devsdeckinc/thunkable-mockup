import React, { Component } from "react";
import { Modal, Button, Typography } from "antd";
import Draggable from "react-draggable";

class DraggableConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,

      disabled: true,
      bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    };
  }

  draggleRef = React.createRef();

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.onConfirm();
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    this.props.onClose();
  };
  /*
   *        Used Antd Template for Dragging Confirmation Box => To Make it easier for users if Confirmation Box Hides the Text Behind
   */
  onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = this.draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    });
  };

  render() {
    const { bounds, visible, disabled } = this.state;
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => this.onStart(event, uiData)}
          >
            <div ref={this.draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Typography.Title
          level={5}
          style={{ margin: "0px auto", display: "flex" }}
        >
          <span style={{margin: "0px 10px"}}>{this.props.icon || ""}</span>
          {this.props.title || " Draggable Confirmation Modal"}
        </Typography.Title>
        <Typography.Paragraph style={{ margin: "0px 50px" }}>
          {this.props.content || ""}
        </Typography.Paragraph>
      </Modal>
    );
  }
}

export default DraggableConfirmationModal;
