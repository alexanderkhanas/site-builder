import axios from "axios";

axios.defaults.baseURL = "https://topfractal.com/api/v1/";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "_token"
)}`;

export const loginRequest = (data) => {
  return axios.post("/getToken", data);
};

export const registerRequest = (data) => {
  return axios.post("/createUser", data);
};

export const loginFacebookRequest = (data) => {
  return axios.post("/facebook-login", data);
};

export const fetchUser = () => {
  return axios.get("/getUserByToken");
};

export const fetchUserGallery = () => {
  return axios.get("/get-user-img");
};

export const deleteUserImagesRequest = (images) => {
  return axios.post("/delete-user-img", { imageFile: images });
};

export const postUserImage = (type, images) => {
  return axios.post("/upload-user-img", {
    type,
    imageFile: images,
  });
};

export const postUserAvatar = (image) => {
  return axios.post("/update-user-avatar", image);
};

export const fetchHeaderImages = (templateId) => {
  return axios.get(`/get-img?templateId=${templateId}&type=imgList`);
};

export const fetchDirections = (token) => {
  return axios.get("/directions");
};

export const fetchTemplates = (id, token) => {
  return axios.get(`/direction/${id}`);
};

export const fetchSingleTemplate = (id) => {
  return axios.get(`/template/${id}`);
};

export const postSite = (site) => {
  return axios.post("/site-create", site);
};

export const patchSite = (site) => {
  return axios.patch("/site-edit", site);
};

export const publishSiteRequest = (siteId) => {
  return axios.post(`/site/publish/${siteId}`, {});
};

export const postImage = (image) => {
  return axios.post("/upload-img", image);
};

export const fetchRefreshedText = (templateId, lang, type) => {
  return axios.get(
    `/refresh-text?lang=${lang}&templateId=${templateId}&type=${type}`
  );
};

export const fetchSectionVariations = (sectionId) => {
  return axios.get(`/category/${sectionId}`);
};

export const fetchHomeContent = (lang) => {
  return axios.get(`/home-page`);
};

export const fetchUserSites = () => {
  return axios.get("/sites");
};

export const fetchSiteDemo = (id) => {
  return axios.get(`/site/preview/${id}`);
};

export const fetchEditingSite = (id) => {
  return axios.get(`/site-data/${id}`);
};

export const deleteSite = (id) => {
  return axios.post(`/site-delete/${id}`, {});
};

export const fetchSingleSite = (id) => {
  return axios.get(`/site/${id}`);
};

export const patchUser = (user) => {
  return axios.post("/update-user", user);
};

export const logoutUserRequest = () => {
  return axios.post("/logout", {});
};

export const postService = (service) => {
  return axios.post("/add-services", service);
};

export const postAdvantage = (advantage) => {
  return axios.post("/add-benefit", advantage);
};

export const fetchDefaultImages = (templateId, type) => {
  return axios.get(`/get-img?templateId=${templateId}&type=${type}`);
};
