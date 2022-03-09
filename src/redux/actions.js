export const addProjectList = (value) => ({
  type: "UPDATE_PROJECT_LIST",
  payload: value,
});

export const presistStore = () => ({
    type: "PERSIST_STORE"
  });