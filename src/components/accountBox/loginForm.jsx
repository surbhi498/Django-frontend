// import React, { useContext } from "react";
// import {
//   BoldLink,
//   BoxContainer,
//   FormContainer,
//   Input,
//   LineText,
//   MutedLink,
//   SubmitButton,
// } from "./common";
// import { Marginer } from "../marginer";
// import { AccountContext } from './accountContext';

// export function LoginForm(props) {

//   const { switchToSignup } = useContext(AccountContext);

//   return (
//     <BoxContainer>
//       <FormContainer>
//         <Input type="email" placeholder="Email" />
//         <Input type="password" placeholder="Password" />
//       </FormContainer>
//       <Marginer direction="vertical" margin={10} />
//       <MutedLink href="#">Forget your password?</MutedLink>
//       <Marginer direction="vertical" margin="1.6em" />
//       <SubmitButton type="submit">Signin</SubmitButton>
//       <Marginer direction="vertical" margin="5px" />
//       <LineText>
//         Don't have an accoun?{" "}
//         <BoldLink onClick={switchToSignup} href="#">
//           Signup
//         </BoldLink>
//       </LineText>
//     </BoxContainer>
//   );
// }

// src/components/accountBox/loginForm.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';
import { login } from '../../services/api'; // Adjust the import path as necessary
import '../../index.css'; // Import your CSS file for styling

const LoginForm = ({ setToken }) => {
  const { switchToSignup } = useContext(AccountContext);
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
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Signin</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
};

export default LoginForm;
