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

// export function SignupForm(props) {

//   const { switchToSignin } = useContext(AccountContext);
//   return (
//     <BoxContainer>
//       <FormContainer>
//         <Input type="text" placeholder="Full name" />
//         <Input type="email" placeholder="Email" />
//         <Input type="password" placeholder="Password" />
//         <Input type="password" placeholder="Confirm password" />
//       </FormContainer>
//       <Marginer direction="vertical" margin={10} />
//       <SubmitButton type="submit">Signup</SubmitButton>
//       <Marginer direction="vertical" margin="5px" />
//       <LineText>
//         Already have an account?{" "}
//         <BoldLink onClick={switchToSignin} href="#">
//           Signin
//         </BoldLink>
//       </LineText>
//     </BoxContainer>
//   );
// }

// src/components/accountBox/signupForm.jsx
import React, { useContext, useState } from "react";
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
import { signup } from '../../services/api'; // Adjust the import path as necessary
import '../../index.css'; // Import your CSS file for styling

const SignupForm = () => {
  const { switchToSignin } = useContext(AccountContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const response = await signup({ username, password });
      console.log('Signup response:', response); // Log the signup response for debugging
      // navigate('/login'); // Navigate to login page after successful signup
      switchToSignin(); // Switch to the sign-in form
    } catch (error) {
      console.error('Signup error:', error); // Log any errors during signup
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit">Signup</SubmitButton> {/* Moved inside FormContainer */}
      </FormContainer>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
};
export default SignupForm;
