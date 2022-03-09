const initState = {
  projectList: [],
};

const updateLocalStorage = data =>
localStorage.setItem("projectList", JSON.stringify(data));;
export const updateProjectList = (state = initState, action) => {
  const localStoredList = localStorage.getItem("projectList");
  switch (action.type) {
    case "PERSIST_STORE":
        const storedList = localStorage.getItem("projectList");
        return { ...state, projectList: storedList ? JSON.parse(storedList) : [] };
    case "UPDATE_PROJECT_LIST":
      const listData = action.payload.projectList;
      updateLocalStorage(listData);
      return { ...state, projectList: listData };
    default:
      return state;
  }
};
