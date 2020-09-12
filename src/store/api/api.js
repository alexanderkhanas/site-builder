import _axios from "./_axios";

export const loginRequest = (data) => {
  return _axios.post("/getToken", data);
};

export const fetchUser = (data) => {
  return _axios.post("/user", data);
};

export const fetchDirections = (token) => {
  return _axios.get("/directions");
};

export const fetchTemplates = (id, token) => {
  return _axios.get(`/direction/${id}`);
};

export const fetchSingleTemplate = (id) => {
  return _axios.get(`/template/${id}`);
};

export const postSite = (data) => {
  return _axios.post("/site-create", data);
};
