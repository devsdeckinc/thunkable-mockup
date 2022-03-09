import React, { Component } from "react";
import {
  Layout,
  Button,
  Tooltip,
  Avatar,
  Typography,
  Card,
  List,
  Divider,
  Space,
  Grid,
  Input,
} from "antd";
import {
  PlusOutlined,
  DeleteFilled,
  EditFilled,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styles from "./styles";
import "./styles.css";
import moment from "moment";
import { connect } from "react-redux";
import ReactDragListView from "react-drag-listview";
import DraggableConfirmationModal from "../../components/DraggableConfirmationModal";
import { addProjectList, presistStore } from "./../../redux/actions";
const { Header, Content, Footer } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      editIndex: null,
      edit: false,
      error: false,
      delIndex: null,
      showDelete: false,
    };
  }
  componentDidMount() {
    this.loadStore();
  }
  loadStore() {
    this.props.presistStore();
    setTimeout(() => {
      if (this.props.state && this.props.state.projectList.length > 0) {
        this.setState({
          projectList: this.props.state.projectList,
        });
      }
    }, 100);
  }
  editProject = (index) => {
    this.setState({
      edit: true,
      editIndex: index,
    });
  };
  addNewProject = () => {
    const newProject = {
      title: "",
      createdAt: new Date(),
    };
    var projectList = this.state.projectList;
    projectList.push(newProject);
    this.setState({
      projectList,
    });
    setTimeout(() => {
      this.updateStore();
      this.scrollToView(projectList);
    }, 200);
  };
  scrollToView = (projectList) => {
    const lastIndex = projectList.length - 1;
    document.getElementById(`list-item-${lastIndex}`).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    /** To Open the Input By Default */ 
    this.editProject(lastIndex)
  };
  exitInput = () => {
    var { projectList, editIndex } = this.state;
    this.setState({
      edit: false,
      editIndex: null,
    });
  };
  deleteProject = (index) => {
    this.setState({
      delIndex: index,
      showDelete: true,
    });
  };
  closeModal = () => {
    this.setState({
      showDelete: false,
      edit: false,
      editIndex: null,
    });
  };
  confirmDelete = () => {
    var { projectList, delIndex, showDelete } = this.state;
    if (delIndex != null && showDelete) {
      projectList.splice(delIndex, 1);
      this.setState({
        projectList,
        showDelete: false,
      });
    }
    setTimeout(() => {
      this.updateStore();
    }, 200);
  };
  onTextChange = (e, index, field) => {
    var projectList = this.state.projectList;
    projectList[index][field] = e.target.value;
    this.setState({ projectList });
    setTimeout(() => {
      this.updateStore();
    }, 200);
  };

  /*
   *       Used Available Codesandbox example from creators
   */
  onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return;
    const items = [...this.state.projectList];
    const item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);

    this.setState({ projectList: items });
    setTimeout(() => {
      this.updateStore();
    }, 200);
  };
  updateStore() {
    this.props.updateProjectList({
      projectList: this.state.projectList,
    });
  }
  render() {
    const { editIndex, edit, error, showDelete, projectList } = this.state;
    return (
      <Layout>
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
        <Divider orientation="right">
          <Tooltip title="Add Project">
            <Button
              style={styles.floatingBtn}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => this.addNewProject()}
            />
          </Tooltip>
        </Divider>
        <Content>
          <div className="main-container">
            <ReactDragListView
              nodeSelector=".ant-list-item.draggble"
              onDragEnd={this.onDragEnd}
            >
              <List
                itemLayout="horizontal"
                dataSource={projectList}
                className="project-list"
                renderItem={(item, index) => {
                  const draggble = item.title !== "";
                  return (
                    <List.Item
                      className={`list-item-card ${draggble ? "draggble" : ""}`}
                      id={`list-item-${index}`}
                    >
                      <Tooltip title="Hold and Drag me and Drop on the List">
                        <Avatar
                          style={styles.logo}
                          actions={["x"]}
                          src={
                            item.icon ||
                            "https://aws1.discourse-cdn.com/business4/uploads/thunkable/original/3X/0/f/0f59f292712368bce16ff80133ae10de8a6f27e8.png"
                          }
                        />
                      </Tooltip>
                      {edit && editIndex == index ? (
                        <div className="list-title">
                          <Input
                            placeholder="Project Title"
                            onChange={(e) =>
                              this.onTextChange(e, index, "title")
                            }
                            onPressEnter={() => this.exitInput()}
                            value={item.title}
                            onBlur={() => this.exitInput()}
                          />
                        </div>
                      ) : (
                        <div className="list-title">
                          <Typography.Text>{item.title}</Typography.Text>
                          <EditFilled
                            style={{
                              padding: 2,
                              margin: "auto",
                              fontSize: 24,
                              color: "#bfbfbf",
                            }}
                            onClick={() => this.editProject(index)}
                          />
                        </div>
                      )}
                      <div className="list-secondary">
                        <Typography.Text>
                          {moment(item.createdAt).format(
                            " MMM DD, YYYY hh:mm A"
                          )}
                        </Typography.Text>
                      </div>

                      <div className="list-end">
                        <DeleteOutlined
                          onClick={() => this.deleteProject(index)}
                          style={{ fontSize: 28, color: "red" }}
                        />
                      </div>
                    </List.Item>
                  );
                }}
              />
            </ReactDragListView>
          </div>
        </Content>
        <DraggableConfirmationModal
          title={"Are you sure do you want to Delete?"}
          content={"This action can't be undone."}
          icon={
            <ExclamationCircleOutlined
              style={{ fontSize: 28, color: "orange" }}
            />
          }
          visible={showDelete}
          onClose={() => this.closeModal()}
          onConfirm={() => this.confirmDelete()}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    presistStore: () => dispatch(presistStore()),
    updateProjectList: (obj) => dispatch(addProjectList(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
