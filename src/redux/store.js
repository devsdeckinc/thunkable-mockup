import { createStore, applyMiddleware } from "redux";
import { updateProjectList } from "./reducer";
import logger from "redux-logger";

export const store = createStore(updateProjectList, applyMiddleware(logger));