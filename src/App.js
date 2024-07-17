import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Posts from './components/Posts';
import './index.css';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Portal</Link></li>
          {token && <li><Link to="/posts">Posts</Link></li>}
        </ul>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/posts" element={token ? <Posts token={token} /> : <p>Please login to see posts.</p>} />
        </Routes>
      </div>
    </Router>
  );
};

const Portal = () => (
  <div className="portal">
    <h2>Welcome to Our Portal</h2>
    <div className="portal-buttons">
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  </div>
);

export default App;
