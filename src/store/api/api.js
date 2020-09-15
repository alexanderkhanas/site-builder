import _axios from "./_axios";

export const loginRequest = (data) => {
  return _axios.post("/getToken", data);
};

export const registerRequest = (data) => {
  return _axios.post("/createUser", data);
};

export const fetchUser = () => {
  return _axios.get("/getUserByToken");
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

export const postImage = (image) => {
  return _axios.post("/upload-img", image);
};

export const fetchRefreshedText = (templateId, lang, type) => {
  return _axios.get(
    `/refresh-text?lang=${lang}&templateId=${templateId}&type=${type}`
  );
};

export const fetchSectionVariations = (sectionId) => {
  return _axios.get(`/category/${sectionId}`);
};

export const fetchHomeContent = (lang) => {
  return _axios.get(`/home-page`);
};
