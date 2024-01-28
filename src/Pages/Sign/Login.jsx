import React, { useState } from 'react';
import * as Components from './components';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Sign.css';

const Login = () => {
  const [avocat, setAvocat] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Create a history instance

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('handleSignUp function called');
    console.log(`Request URL: /api/${avocat ? 'lawyer' : 'client'}-login/`);
    try {
      const userType = avocat ? 'lawyer' : 'client';

      const response = await axios.post(`/api/${userType}-login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        // Handle successful sign-in
        console.log(`${userType} signed in successfully`);

        const authToken = response.data.token;
        localStorage.setItem('authToken', authToken);

        navigate(`/${userType}-profile`);
      } else {
        // Handle sign-in failure
        console.error(`Failed to sign in as ${userType}:`, response.statusText);
      }
    } catch (error) {
      console.error(
        `Error during sign-in as ${avocat ? 'lawyer' : 'client'}:`,
        error
      );
    }
  };

  const handleGoogleLogin = (response) => {
    // Handle Google login response here
    console.log(response);
  };

  return (
    <div className='bodyStyle'>
      <Components.Container>
        <Components.SignUpContainer signinIn={avocat}>
          <Components.Form>
            <Components.TitleO>
              Connectez-vous en tant qu'Avocat
            </Components.TitleO>
            <Components.Input
              type='username'
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Components.Input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Components.ButtonO onClick={(e) => handleSignIn(e)}>
              Connecter
            </Components.ButtonO>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={avocat}>
          <Components.Form>
            <Components.TitleO>
              Connectez-vous en tant que Client
            </Components.TitleO>
            <Components.Input
              type='username'
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Components.Input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Components.ButtonO onClick={(e) => handleSignIn(e)}>
              Connectez
            </Components.ButtonO>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={avocat}>
          <Components.Overlay signinIn={avocat}>
            <Components.LeftOverlayPanel signinIn={avocat}>
              <Components.Title>Client !</Components.Title>
              <Components.Paragraph>
                Si vous êtes un client, nous vous invitons à cliquer ici pour
                accéder à nos services et profiter d'une expérience optimale sur
                notre site
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setAvocat(true)}>
                Client
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={avocat}>
              <Components.Title>Avocat !</Components.Title>
              <Components.Paragraph>
                Êtes-vous un avocat ? Si tel est le cas, veuillez cliquer ici
                pour bénéficier d'une expérience professionnelle au sein de
                notre site
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setAvocat(false)}>
                Avocat
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Login;
