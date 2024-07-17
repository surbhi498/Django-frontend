import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../index.css'; // Import your CSS file for styling

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response.data); // Check the response
      setToken(response.data.access); // Set the access token
      navigate('/posts');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container"> {/* Apply styling to this container */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Apply styling to form-group for consistent spacing */}
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group"> {/* Apply styling to form-group for consistent spacing */}
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
