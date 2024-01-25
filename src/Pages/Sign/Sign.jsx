// import React, { useState } from 'react';
// import * as Components from './components';
// import { GoogleLogin } from '@react-oauth/google';
// import './Sign.css';

// const Sign = () => {
//   const [signIn, toggle] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async () => {
//     try {
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (response.ok) {
//         // Handle successful signup
//         console.log('User signed up successfully');
//       } else {
//         // Handle signup failure
//         console.error('Failed to sign up:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during signup:', error);
//     }
//   };

//   const handleGoogleLogin = (response) => {
//     // Handle Google login response here
//     console.log(response);
//   };

//   return (
//     <div className='bodyStyle'>
//       <Components.Container>
//         <Components.SignUpContainer signinIn={Avocat}>
//           <Components.Form>
//             <Components.TitleO>
//               Connectez-vous en tant qu'Avocat
//             </Components.TitleO>
//             <Components.Input
//               type='text'
//               placeholder='Name'
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Components.Input
//               type='email'
//               placeholder='Email'
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Components.Input
//               type='text'
//               placeholder='Specialité'
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Components.Input
//               type='password'
//               placeholder='Password'
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Components.ButtonO onClick={handleSignUp}>
//               connecter
//             </Components.ButtonO>
//             <GoogleLogin
//               onSuccess={(credentialResponse) => {
//                 console.log(credentialResponse);
//               }}
//               onError={() => {
//                 console.log('Login Failed');
//               }}
//               useOneTap
//             />
//           </Components.Form>
//         </Components.SignUpContainer>

//         <Components.SignInContainer signinIn={client}>
//           <Components.Form>
//             <Components.TitleO>
//               Connectez-vous en tant que Client
//             </Components.TitleO>
//             <Components.Input
//               type='text'
//               placeholder='Name'
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Components.Input
//               type='email'
//               placeholder='Email'
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Components.Input
//               type='password'
//               placeholder='Password'
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Components.ButtonO>connectez</Components.ButtonO>
//             <GoogleLogin
//               onSuccess={(credentialResponse) => {
//                 console.log(credentialResponse);
//               }}
//               onError={() => {
//                 console.log('Login Failed');
//               }}
//               useOneTap
//             />
//           </Components.Form>
//         </Components.SignInContainer>

//         <Components.OverlayContainer signinIn={avocat}>
//           <Components.Overlay signinIn={avocat}>
//             <Components.LeftOverlayPanel signinIn={avocat}>
//               <Components.Title>Client !</Components.Title>
//               <Components.Paragraph>
//                 Si vous êtes un client, nous vous invitons à cliquer ici pour
//                 accéder à nos services et profiter d'une expérience optimale sur
//                 notre site
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(true)}>
//                 Client
//               </Components.GhostButton>
//             </Components.LeftOverlayPanel>

//             <Components.RightOverlayPanel signinIn={avocat}>
//               <Components.Title>Avocat !</Components.Title>
//               <Components.Paragraph>
//                 Êtes-vous un avocat ? Si tel est le cas, veuillez cliquer ici
//                 pour bénéficier d'une expérience professionnelle au sein de
//                 notre site
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(false)}>
//                 Avocat
//               </Components.GhostButton>
//             </Components.RightOverlayPanel>
//           </Components.Overlay>
//         </Components.OverlayContainer>
//       </Components.Container>
//     </div>
//   );
// };

// export default Sign;
import React, { useState } from 'react';
import * as Components from './components';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Import Axios
import './Sign.css';

const Sign = () => {
  const [avocat, setAvocat] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialite, setSpecialite] = useState(''); // Added specialite state for avocat
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userType = avocat ? 'avocat' : 'client';

      const response = await axios.post(`/api/signup/${userType}`, {
        name,
        email,
        specialite, // Include specialite for avocat
        password,
      });

      if (response.status === 201) {
        // Handle successful signup
        console.log(`${userType} signed up successfully`);

        // Assuming your backend returns an authentication token
        const authToken = response.data.token;

        // Store the authentication token (adjust this based on your preferred method)
        localStorage.setItem('authToken', authToken);

        // You can redirect to another page or perform additional actions here
      } else {
        // Handle signup failure
        console.error(`Failed to sign up as ${userType}:`, response.statusText);
      }
    } catch (error) {
      console.error(
        `Error during signup as ${avocat ? 'avocat' : 'client'}:`,
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
              type='text'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />
            <Components.Input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            {avocat && ( // Render specialite field only for avocat
              <Components.Input
                type='text'
                placeholder='Specialité'
                onChange={(e) => setSpecialite(e.target.value)}
              />
            )}
            <Components.Input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Components.ButtonO onClick={handleSignUp}>
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
            <Components.ButtonO onClick={handleSignUp}>
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

export default Sign;
