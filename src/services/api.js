// import axios from 'axios';

// // const API_URL = 'http://3.16.70.225/api'; // Change this to your backend URL
// const API_URL = 'http://127.0.0.1:8000/api'; 
// // Function to store token securely
// const storeToken = (token) => {
//   localStorage.setItem('token', token); // Store token in localStorage
//   // sessionStorage.setItem('token', token); // Alternatively, store in sessionStorage
// };
// export const signup = async (userData) => {
//     try {
//       const response = await axios.post(`${API_URL}/signup/`, userData);
//       console.log('Signup response:', response);
//       return response.data; // Return data if needed
//     } catch (error) {
//       throw error; // Throw error for handling in component
//     }
//   };
//   // Function to clear token
// const clearToken = () => {
//   localStorage.removeItem('token');
//   // sessionStorage.removeItem('token'); // Alternatively, remove from sessionStorage
// };
//   export const login = async (userData) => {
//     try {
//       const response = await axios.post(`${API_URL}/login/`, userData);
//       const access1 = response.data.access; // Assuming 'access' contains the JWT token
//       storeToken(access1); // Store the token securely
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   };
//   // export const login = async (userData) => {
//   //   return await axios.post(`${API_URL}/login/`, userData);
//   // };
//   export const fetchPosts = async (token) => {
//     // Check if token is present and not expired
//     const storedToken = localStorage.getItem('token');
//     console.log(storedToken);
//     if (!storedToken) {
//       // Handle case where token is not present
//       console.log('Token not found');
//       return;
//     }
  
//     try {
//       const response = await axios.get(`${API_URL}/posts/`, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         // Handle 401 Unauthorized (token expired or invalid)
//         console.log('Token expired or invalid');
//         // Clear token from localStorage and redirect to login page
//         localStorage.removeItem('token');
//         // Redirect to login page or show message to user
//       } else {
//         console.error('Error fetching posts:', error);
//         throw error;
//       }
//     }
//   };
// export const likePost = async (postId, token) => {
//     return await axios.post(`${API_URL}/posts/${postId}/like_post/`, {}, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };
//   export const logout = async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         // Handle case where token is not present
//         console.log('Token not found');
//         return;
//       }
  
//       await axios.post(`${API_URL}/logout/`, null, {  // <-- Pass null as second argument for no data
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });
  
//       // Clear token from localStorage
//       clearToken();
//       console.log('Logout successful');
//     } catch (error) {
//       console.error('Logout error:', error);
//       throw error;
//     }
//   }; 

import axios from 'axios';

// const API_URL = 'http://3.16.70.225/api'; // Change this to your backend URL
const API_URL = 'http://127.0.0.1:8000/api';

// Function to store tokens securely
const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  // Alternatively, store in sessionStorage
};

// Function to clear tokens
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // Alternatively, remove from sessionStorage
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
    const { access, refresh } = response.data; // Assuming 'access' and 'refresh' are in the response
    storeTokens(access, refresh); // Store both tokens securely
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPosts = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.log('Access token not found');
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/posts/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Token expired or invalid');
      clearTokens();
      // Optionally, trigger token refresh or redirect to login page
    } else {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
};

export const likePost = async (postId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.log('Access token not found');
    return;
  }

  try {
    return await axios.post(`${API_URL}/posts/${postId}/like_post/`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  console.log('Logout Token:', refreshToken); // Log the token
  if (!refreshToken) {
    console.log('Refresh token not found');
    return;
  }

  try {
    // Send a POST request to the logout endpoint with the refresh token in the Authorization header
    await axios.post(`${API_URL}/logout/`, {
      refresh: refreshToken,
    }, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
  });
    clearTokens();
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const requestPasswordReset = async (data) => {
  return await axios.post(`${API_URL}/password-reset/`, data);
};

export const createPost = async (token, title, content) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.post(`${API_URL}/create-post/`, {
    title,
    content,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};