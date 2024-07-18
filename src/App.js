// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import Posts from './components/Posts';
// import './index.css';

// const App = () => {
//   const [token, setToken] = useState(null);

//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li><Link to="/">Portal</Link></li>
//           {token && <li><Link to="/posts">Posts</Link></li>}
//         </ul>
//       </nav>

//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Portal />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login setToken={setToken} />} />
//           <Route path="/posts" element={token ? <Posts token={token} /> : <p>Please login to see posts.</p>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const Portal = () => (
//   <div className="portal">
//     <h2>Welcome to Our Portal</h2>
//     <div className="portal-buttons">
//       <Link to="/signup">
//         <button>Signup</button>
//       </Link>
//       <Link to="/login">
//         <button>Login</button>
//       </Link>
//     </div>
//   </div>
// );

// export default App;
// import React from "react";
// import "./styles.css";
// import styled from "styled-components";
// import AccountBox from "./components/accountBox/index"
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Posts from "./components/Posts"; // Import your Posts component


// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;
// const ContentContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;
// function App() {
//   const [token, setToken] = useState(null);

//   const handleSetToken = (token) => {
//     setToken(token);
//     // Optionally navigate to posts page here if needed
//   };

//   return (
//     <Router>
//       <AppContainer>
//         <ContentContainer>
//           <Routes>
//             <Route path="/" element={<AccountBox setToken={handleSetToken} />} />
//             <Route path="/posts" element={token ? <Posts token={token} /> : <Navigate to="/" />} />
//           </Routes>
//         </ContentContainer>
//       </AppContainer>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import "./styles.css";
import styled from "styled-components";
import AccountBox from "./components/accountBox/index";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Posts from "./components/Posts"; // Import your Posts component

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #282c34; // New background color
`;

function App() {
  const [token, setToken] = useState(null);

  const handleSetToken = (token) => {
    setToken(token);
    // Optionally navigate to posts page here if needed
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<AccountBox setToken={handleSetToken} />} />
          <Route path="/posts" element={token ? <Posts token={token} /> : <Navigate to="/" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
