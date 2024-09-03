// import axios from "axios";
// //import jwt_decode from "jwt-decode";
// // import axios from "axios";

// // Initialize axios instance with base URL
// const API = axios.create({
//   baseURL: `http://localhost:3000/api`,
//   withCredentials: true, // This allows sending cookies from cross-origin requests if needed
// });

// // Interceptors for handling errors globally (optional but useful)
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors globally
//     console.error("API call failed:", error);
//     return Promise.reject(error);
//   }
// );

// //auth
// export const signIn = async ({ email, password }) =>
//   await API.post("/auth/signin", { email, password });
// export const signUp = async ({ name, email, password }) =>
//   await API.post("/auth/signup", {
//     name,
//     email,
//     password,
//   });
// export const googleSignIn = async ({ name, email, img }) =>
//   await API.post("/auth/google", {
//     name,
//     email,
//     img,
//   });
// export const findUserByEmail = async (email) =>
//   await API.get(`/auth/findbyemail?email=${email}`);
// export const generateOtp = async (email, name, reason) =>
//   await API.get(
//     `/auth/generateotp?email=${email}&name=${name}&reason=${reason}`
//   );
// export const verifyOtp = async (otp) =>
//   await API.get(`/auth/verifyotp?code=${otp}`);
// export const resetPassword = async (email, password) =>
//   await API.put(`/auth/forgetpassword`, { email, password });
// //user api
// export const getUsers = async (token) =>
//   await API.get(
//     "/user",
//     { headers: { Authorization: `Bearer ${token}` } },
//     {
//       withCredentials: true,
//     }
//   );
// export const searchUsers = async (search, token) =>
//   await API.get(
//     `users/search/${search}`,
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );
// //podcast api
// export const createPodcast = async (podcast, token) =>
//   await API.post(
//     "/podcasts",
//     podcast,
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );
// export const getPodcasts = async () => await API.get("/podcasts");
// export const addEpisodes = async (podcast, token) =>
//   await API.post(
//     "/podcasts/episode",
//     podcast,
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );
// export const favoritePodcast = async (id, token) =>
//   await API.post(
//     `/podcasts/favorit`,
//     { id: id },
//     { headers: { Authorization: `Bearer ${token}` } },
//     { withCredentials: true }
//   );
// export const getRandomPodcast = async () => await API.get("/podcasts/random");
// export const getPodcastByTags = async (tags) =>
//   await API.get(`/podcasts/tags?tags=${tags}`);
// export const getPodcastByCategory = async (category) =>
//   await API.get(`/podcasts/category?q=${category}`);
// export const getMostPopularPodcast = async () =>
//   await API.get("/podcasts/mostpopular");
// export const getPodcastById = async (id) =>
//   await API.get(`/podcasts/get/${id}`);
// export const addView = async (id) => await API.post(`/podcasts/addview/${id}`);
// export const searchPodcast = async (search) =>
//   await API.get(`/podcasts/search?q=${search}`);
import axios from "axios";

// Initialize axios instance with base URL
const API = axios.create({
  baseURL: `http://localhost:2502/api`,  // Update this to match your backend's port
  withCredentials: true,  // This allows sending cookies from cross-origin requests if needed
});

// Interceptors for handling errors globally (optional but useful)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API call failed:", error);
    return Promise.reject(error);
  }
);

// Auth API calls
export const signIn = async ({ email, password }) =>
  await API.post("/auth/signin", { email, password });

export const signUp = async ({ name, email, password }) =>
  await API.post("/auth/signup", {
    name,
    email,
    password,
  });

export const googleSignIn = async ({ name, email, img }) =>
  await API.post("/auth/google", {
    name,
    email,
    img,
  });

export const findUserByEmail = async (email) =>
  await API.get(`/auth/findbyemail?email=${email}`);

export const generateOtp = async (email, name, reason) =>
  await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);

export const verifyOtp = async (otp) =>
  await API.get(`/auth/verifyotp?code=${otp}`);

export const resetPassword = async (email, password) =>
  await API.put(`/auth/forgetpassword`, { email, password });

// User API calls
export const getUsers = async (token) =>
  await API.get("/user", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const searchUsers = async (search, token) =>
  await API.get(`/users/search/${search}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Podcast API calls
export const createPodcast = async (podcast, token) =>
  await API.post("/podcasts", podcast, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getPodcasts = async () => await API.get("/podcasts");

export const addEpisodes = async (podcast, token) =>
  await API.post("/podcasts/episode", podcast, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const favoritePodcast = async (id, token) =>
  await API.post(`/podcasts/favorit`, { id: id }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getRandomPodcast = async () => await API.get("/podcasts/random");

export const getPodcastByTags = async (tags) =>
  await API.get(`/podcasts/tags?tags=${tags}`);

export const getPodcastByCategory = async (category) =>
  await API.get(`/podcasts/category?q=${category}`);

export const getMostPopularPodcast = async () =>
  await API.get("/podcasts/mostpopular");

export const getPodcastById = async (id) =>
  await API.get(`/podcasts/get/${id}`);

export const addView = async (id) =>
  await API.post(`/podcasts/addview/${id}`);

export const searchPodcast = async (search) =>
  await API.get(`/podcasts/search?q=${search}`);
