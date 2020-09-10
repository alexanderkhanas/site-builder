import _axios from "./_axios";

export const loginRequest = (data) => {
  return _axios.post("/getToken", data);
};

export const fetchDirections = (token) => {
  return _axios.get("/directions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchTemplates = (id, token) => {
  return _axios.get(`/direction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
