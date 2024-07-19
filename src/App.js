// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import AccountBox from "./components/accountBox/index";
// import Posts from "./components/Posts"; // Import your Posts component
// import { logout } from "./services/api";

// const AppContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display:flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #282c34; // New background color
//   position: relative;
// `;

// const Navbar = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: flex-end;
//   padding: 10px 20px;
//   background-color: #3a3f47;
//   color: white;
//   position: absolute;
//   top: 0;
// `;

// const Username = styled.span`
//   margin-right: 20px;
//   cursor: pointer;
//   position: relative;
// `;

// const Dropdown = styled.div`
//   position: absolute;
//   top: 30px;
//   right: 20px;
//   background-color: #3a3f47;
//   color: white;
//   border: 1px solid #282c34;
//   border-radius: 5px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
// `;

// const DropdownItem = styled.div`
//   padding: 10px 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: #282c34;
//   }
// `;

// function App() {
//   const storageAcessToken = localStorage.getItem("access_token"); // Check if there is an accesst
//   // const token = localStorage.getItem('access_token');
//   //const [token, setToken] = useState(null);
//   const [token, setToken] = useState("");
//   useEffect(() => {
//     setToken(localStorage.getItem("access_token"));
//   }, [storageAcessToken]);
//   const [username, setUsername] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const handleSetToken = (token, username) => {
//     setToken(token);
//     setUsername(username);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout(); // Call the logout function from api.js
//       setToken(null);
//       setUsername(null);
//       setDropdownVisible(false);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   return (
//     <Router>
//       <AppContainer>
//         {token && (
//           <Navbar>
//             <Username onClick={toggleDropdown}>
//               {username}
//               {dropdownVisible && (
//                 <Dropdown>
//                   <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
//                 </Dropdown>
//               )}
//             </Username>
//           </Navbar>
//         )}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               token ? (
//                 <Navigate to="/posts" />
//               ) : (
//                 <AccountBox setToken={handleSetToken} />
//               )
//             }
//           />
//           <Route
//             path="/posts"
//             element={token ? <Posts token={token} /> : <Navigate to="/" />}
//           />
//         </Routes>
//       </AppContainer>
//     </Router>
//   );
// }
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PasswordResetForm from "./components/PasswordResetForm"; 
import CreatePostForm from "./components/CreatePostForm"; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AccountBox from "./components/accountBox/index";
import Posts from "./components/Posts";
import { logout } from "./services/api";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  position: relative;
  overflow-y: auto; /* Enable vertical scrolling */
  padding-top: 100px; /* Adjust for fixed navbar */
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center; /* Center items vertically */
  padding: 10px 30px; /* Added padding for space inside navbar */
  background-color: #3a3f47;
  color: white;
  position: fixed;
  top: 0;
  height: 70px; /* Increased height for better visual appeal */
  z-index: 1000;
`;

const Username = styled.span`
  margin-right: 50px; /* Increased margin to push username away from the right edge */
  cursor: pointer;
  font-size: 18px; /* Increased font size for prominence */
  font-weight: bold; /* Added bold font weight */
  color: #ffffff;
  position: relative; /* Position relative for dropdown alignment */
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%; /* Position below the username */
  right: 0;
  background-color: #3a3f47;
  color: white;
  border: 1px solid #282c34;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 150px; /* Set width of dropdown */
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
  }
`;

function App() {
  const storageAcessToken = localStorage.getItem("access_token");
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [storageAcessToken]);

  const [username, setUsername] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSetToken = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setToken(null);
      setUsername(null);
      setDropdownVisible(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <Router>
      <AppContainer>
        {token && (
          <Navbar>
            <Username onClick={toggleDropdown}>
              {username}
              <Dropdown visible={dropdownVisible}>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </Dropdown>
            </Username>
          </Navbar>
        )}
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/posts" />
              ) : (
                <AccountBox setToken={handleSetToken} />
              )
            }
          />
          <Route
            path="/posts"
            element={token ? <Posts token={token} /> : <Navigate to="/" />}
          />
          <Route
            path="/password-reset"
            element={<PasswordResetForm />} // Add password reset route
          />
          <Route
            path="/create-post"
            element={token ? <CreatePostForm token={token} /> : <Navigate to="/" />}
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
