import axios from "axios";

// Backend server ka address (Node/Express port 5000 par chalega)
export const SERVER_URL = "http://localhost:5000";

const API = axios.create({
  baseURL: `${SERVER_URL}/api`,
});

// Image bhej kar prediction mangna
export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // "image" naam backend ke multer se match hona chahiye

  const response = await API.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

// Saari purani predictions lana
export const getHistory = async () => {
  const response = await API.get("/history");
  return response.data;
};

// Ek history item delete karna
export const deleteHistoryItem = async (id) => {
  const response = await API.delete(`/history/${id}`);
  return response.data;
};