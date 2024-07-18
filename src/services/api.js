import axios from 'axios';

// const API_URL = 'http://3.16.70.225/api'; // Change this to your backend URL
const API_URL = 'http://127.0.0.1:8000/api'; 
// Function to store token securely
const storeToken = (token) => {
  localStorage.setItem('token', token); // Store token in localStorage
  // sessionStorage.setItem('token', token); // Alternatively, store in sessionStorage
};
export const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup/`, userData);
      console.log('Signup response:', response);
      return response.data; // Return data if needed
    } catch (error) {
      throw error; // Throw error for handling in component
    }
  };
  export const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, userData);
      const access1 = response.data.access; // Assuming 'access' contains the JWT token
      storeToken(access1); // Store the token securely
      return response;
    } catch (error) {
      throw error;
    }
  };
  // export const login = async (userData) => {
  //   return await axios.post(`${API_URL}/login/`, userData);
  // };
  export const fetchPosts = async (token) => {
    // Check if token is present and not expired
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      // Handle case where token is not present
      console.log('Token not found');
      return;
    }
  
    try {
      const response = await axios.get(`${API_URL}/posts/`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized (token expired or invalid)
        console.log('Token expired or invalid');
        // Clear token from localStorage and redirect to login page
        localStorage.removeItem('token');
        // Redirect to login page or show message to user
      } else {
        console.error('Error fetching posts:', error);
        throw error;
      }
    }
  };
export const likePost = async (postId, token) => {
    return await axios.post(`${API_URL}/posts/${postId}/like_post/`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };