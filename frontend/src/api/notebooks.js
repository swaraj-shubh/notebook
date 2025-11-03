import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getAllNotebooks = () => API.get("/notebooks/");
export const getNotebookById = (id) => {
  if (!id || id === "undefined") {
    return Promise.reject(new Error("Invalid notebook ID"));
  }
  return API.get(`/notebooks/${id}`);
};
export const createNotebook = (data) => API.post("/notebooks/", data);
export const deleteNotebook = (id) => {
  if (!id || id === "undefined") {
    return Promise.reject(new Error("Invalid notebook ID"));
  }
  return API.delete(`/notebooks/${id}`);
};

export const createNote = (nbId, data) => {
  if (!nbId || nbId === "undefined") {
    return Promise.reject(new Error("Invalid notebook ID"));
  }
  return API.post(`/notebooks/${nbId}/notes/`, data);
};
export const updateNote = (nbId, noteId, data) => {
  if (!nbId || nbId === "undefined") {
    return Promise.reject(new Error("Invalid notebook ID"));
  }
  if (!noteId || noteId === "undefined") {
    return Promise.reject(new Error("Invalid note ID"));
  }
  return API.patch(`/notebooks/${nbId}/notes/${noteId}`, data);
};
export const deleteNote = (nbId, noteId) => {
  if (!nbId || nbId === "undefined") {
    return Promise.reject(new Error("Invalid notebook ID"));
  }
  if (!noteId || noteId === "undefined") {
    return Promise.reject(new Error("Invalid note ID"));
  }
  return API.delete(`/notebooks/${nbId}/notes/${noteId}`);
};