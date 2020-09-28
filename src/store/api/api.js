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

export const fetchUserGallery = () => {
  return _axios.get("/get-user-img");
};

export const deleteUserImagesRequest = (images) => {
  return _axios.post("/delete-user-img", { imageFile: images });
};

export const postUserImage = (type, images) => {
  return _axios.post("/upload-user-img", {
    type,
    imageFile: images,
  });
};

export const postUserAvatar = (image) => {
  return _axios.post("/update-user-avatar", image);
};

export const fetchHeaderImages = (templateId) => {
  return _axios.get(`/get-img?templateId=${templateId}&type=imgList`);
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

export const postSite = (site) => {
  return _axios.post("/site-create", site);
};

export const patchSite = (site) => {
  return _axios.patch("/site-edit", site);
};

export const publishSiteRequest = (siteId) => {
  return _axios.post(`/site/publish/${siteId}`, {});
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

export const fetchUserSites = () => {
  return _axios.get("/sites");
};

export const fetchSiteDemo = (id) => {
  return _axios.get(`/site/preview/${id}`);
};

export const fetchEditingSite = (id) => {
  return _axios.get(`/site-data/${id}`);
};

export const deleteSite = (id) => {
  return _axios.post(`/site-delete/${id}`, {});
};

export const fetchSingleSite = (id) => {
  return _axios.get(`/site/${id}`);
};

export const patchUser = (user) => {
  return _axios.post("/update-user", user);
};

export const logoutUserRequest = () => {
  return _axios.post("/logout", {});
};

export const postService = (service) => {
  return _axios.post("/add-services", service);
};

export const postAdvantage = (advantage) => {
  return _axios.post("/add-benefit", advantage);
};

export const fetchDefaultImages = (templateId, type) => {
  return _axios.get(`/get-img?templateId=${templateId}&type=${type}`);
};
