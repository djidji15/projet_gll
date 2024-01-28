import React, { useState } from 'react';
import * as Components from './components';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Import Axios
import './Sign.css';
import { Link } from 'react-router-dom';

const Sign = () => {
  const [avocat, setAvocat] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialite, setSpecialite] = useState(''); // Added specialite state for avocat
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('handleSignUp function called');

    try {
      const userType = avocat ? 'lawyers' : 'clients';

      const response = await axios.post(
        `http://localhost:8000/lawyers/register`,
        {
          name,
          email,
          specialite,
          password,
        }
      );

      if (response.status === 201) {
        console.log(`${userType} signed up successfully`);
        // Optionally, you can perform any other actions upon successful signup
      } else {
        console.error(`Failed to sign up as ${userType}:`, response.statusText);
        // Optionally, set an error state to display to the user
      }
    } catch (error) {
      console.error(`Error during sign-up:`, error);
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
              type='text'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />
            <Components.Input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />

            <Components.Input
              type='text'
              placeholder='Specialité'
              onChange={(e) => setSpecialite(e.target.value)}
            />
            <Components.Input
              type='text'
              placeholder='Adresse'
              onChange={(e) => setSpecialite(e.target.value)}
            />

            <Components.Input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to='/'>
              <Components.ButtonO onClick={(e) => handleSignUp(e)}>
                Connecter
              </Components.ButtonO>
            </Link>
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
              type='text'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />
            <Components.Input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Components.Input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to='/'>
              <Components.ButtonO onClick={(e) => handleSignUp(e)}>
                Connecter
              </Components.ButtonO>
            </Link>
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

export default Sign;
