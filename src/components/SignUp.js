import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import '../index.css'; // Import your CSS file for styling

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container"> {/* Apply styling to this container */}
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Apply styling to form-group for consistent spacing */}
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group"> {/* Apply styling to form-group for consistent spacing */}
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;
