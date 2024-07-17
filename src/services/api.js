import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Change this to your backend URL

export const signup = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup/`, userData);
      console.log('Signup response:', response.data);
      return response.data; // Return data if needed
    } catch (error) {
      throw error; // Throw error for handling in component
    }
  };
export const login = async (userData) => {
  return await axios.post(`${API_URL}/login/`, userData);
};

export const fetchPosts = async (token) => {
  return await axios.get(`${API_URL}/posts/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const likePost = async (postId, token) => {
    return await axios.post(`${API_URL}/posts/${postId}/like_post/`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };