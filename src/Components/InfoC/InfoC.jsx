// import React, { useState, useEffect } from 'react';
// import './InfoC.css';
// import axios from 'axios';

// const InfoC = () => {
//   const [userInfo, setUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUserInfo, setEditedUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user'); // Replace with the actual backend endpoint
//         setUserInfo(response.data); // Update user info in state
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []); // Empty dependency array ensures the effect runs once when the component mounts

//   const handleModifierClick = () => {
//     // Handle the "Modifier" button click to show the edit form
//     setIsEditing(true);
//     setEditedUserInfo(userInfo);
//   };

//   const handleInputChange = (e) => {
//     // Update the editedUserInfo state when input fields change
//     setEditedUserInfo({ ...editedUserInfo, [e.target.name]: e.target.value });
//   };

//   const handleEnregistrerClick = async () => {
//     try {
//       // Send a request to the backend to update the user information
//       await axios.put('/api/user', editedUserInfo); // Replace with the actual backend endpoint
//       console.log('User information updated successfully!');
//       setIsEditing(false); // Hide the edit form after saving
//       setUserInfo(editedUserInfo); // Update the displayed user information
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   return (
//     <div>
//       <div className='bienvenue-container'>
//         <p>
//           Bienvenue
//           {userInfo.Nom && userInfo.Prenom
//             ? `${userInfo.Nom} ${userInfo.Prenom}`
//             : ''}
//         </p>
//       </div>
//       <div className='info-container2'>
//         <p>Information personnelle :</p>
//         <p>Nom: {userInfo.Nom}</p>
//         <p>Prénom: {userInfo.Prenom}</p>
//         <p>Adresse email: {userInfo.AdresseEmail}</p>
//         <button onClick={handleModifierClick}>Modifier</button>
//       </div>
//       <div className={`bienvenue-container ${isEditing ? 'slide-left' : ''}`}>
//         {!isEditing && <button onClick={handleModifierClick}>Modifier</button>}
//       </div>
//       <div className={`info-container2 ${isEditing ? 'slide-left' : ''}`}>
//         <p>Modification des informations :</p>
//         <label>Nom: </label>
//         <input
//           type='text'
//           name='Nom'
//           value={editedUserInfo.Nom}
//           onChange={handleInputChange}
//         />
//         <label>Prénom: </label>
//         <input
//           type='text'
//           name='Prenom'
//           value={editedUserInfo.Prenom}
//           onChange={handleInputChange}
//         />
//         <label>Adresse email: </label>
//         <input
//           type='text'
//           name='AdresseEmail'
//           value={editedUserInfo.AdresseEmail}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleEnregistrerClick}>Enregistrer</button>
//       </div>
//     </div>
//   );
// };

// export default InfoC;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InfoC.css';

// const InfoC = () => {
//   const [userInfo, setUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [editedUserInfo, setEditedUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user');
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleModifierClick = () => {
//     setEditedUserInfo({ ...userInfo }); // Copy user info to editedUserInfo
//     setIsEditing(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEnregistrerClick = async () => {
//     try {
//       // Send a request to update user information
//       await axios.put('/api/user', editedUserInfo);

//       // Update displayed user information
//       setUserInfo({ ...editedUserInfo });

//       // Exit edit mode
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   return (
//     <div>
//       {/*displaying of data */}
//       <div className={`bienvenue-container ${isEditing ? 'slide-left' : ''}`}>
//         <p>
//           Bienvenue
//           {userInfo.Nom && userInfo.Prenom
//             ? `${userInfo.Nom} ${userInfo.Prenom}`
//             : ''}
//         </p>
//         <div className='info-container2'>
//           <p>Information personnelle :</p>
//           <p>Nom: {userInfo.Nom}</p>
//           <p>Prénom: {userInfo.Prenom}</p>
//           <p>Adresse email: {userInfo.AdresseEmail}</p>
//           <button onClick={handleModifierClick}>Modifier</button>
//         </div>
//         {!isEditing && <button onClick={handleModifierClick}>Modifier</button>}
//       </div>
//       {/*modification of data*/}

//       <div className={`info-container2 ${isEditing ? 'slide-left' : ''}`}>
//         {isEditing ? (
//           <>
//             <p>Modification des informations :</p>
//             <label>Nom: </label>
//             <input
//               type='text'
//               name='Nom'
//               value={editedUserInfo.Nom}
//               onChange={handleInputChange}
//             />
//             <label>Prénom: </label>
//             <input
//               type='text'
//               name='Prenom'
//               value={editedUserInfo.Prenom}
//               onChange={handleInputChange}
//             />
//             <label>Adresse email: </label>
//             <input
//               type='text'
//               name='AdresseEmail'
//               value={editedUserInfo.AdresseEmail}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleEnregistrerClick}>Enregistrer</button>
//           </>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default InfoC;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InfoC.css';

// const InfoC = () => {
//   const [userInfo, setUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [editedUserInfo, setEditedUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user');
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleModifierClick = () => {
//     setEditedUserInfo({ ...userInfo }); // Copy user info to editedUserInfo
//     setIsEditing(!isEditing); // Toggle the isEditing state
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEnregistrerClick = async () => {
//     try {
//       // Send a request to update user information
//       await axios.put('/api/user', editedUserInfo);

//       // Update displayed user information
//       setUserInfo({ ...editedUserInfo });

//       // Exit edit mode
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   return (
//     <div className={`info-container ${isEditing ? 'slide-left' : ''}`}>
//       <p>
//         Bienvenue
//         {userInfo.Nom && userInfo.Prenom
//           ? `${userInfo.Nom} ${userInfo.Prenom}`
//           : ''}
//       </p>
//       <div className='info-container2'>
//         <p>Information personnelle :</p>
//         <p>Nom: {userInfo.Nom}</p>
//         <p>Prénom: {userInfo.Prenom}</p>
//         <p>Adresse email: {userInfo.AdresseEmail}</p>
//         {isEditing && (
//           <>
//             <p>Modification des informations :</p>
//             <label>Nom: </label>
//             <input
//               type='text'
//               name='Nom'
//               value={editedUserInfo.Nom}
//               onChange={handleInputChange}
//             />
//             <label>Prénom: </label>
//             <input
//               type='text'
//               name='Prenom'
//               value={editedUserInfo.Prenom}
//               onChange={handleInputChange}
//             />
//             <label>Adresse email: </label>
//             <input
//               type='text'
//               name='AdresseEmail'
//               value={editedUserInfo.AdresseEmail}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleEnregistrerClick}>Enregistrer</button>
//           </>
//         )}
//         {!isEditing && <button onClick={handleModifierClick}>Modifier</button>}
//       </div>
//     </div>
//   );
// };

// export default InfoC;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InfoC.css';

// const InfoC = () => {
//   const [userInfo, setUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [editedUserInfo, setEditedUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user');
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleModifierClick = () => {
//     if (!isEditing) {
//       setEditedUserInfo({ ...userInfo });
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEnregistrerClick = async () => {
//     try {
//       // Send a request to update user information
//       await axios.put('/api/user', editedUserInfo);

//       // Update displayed user information
//       setUserInfo({ ...editedUserInfo });

//       // Exit edit mode
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   return (
//     <div className='info-container'>
//       <div className='bienvenue-container'>
//         <p>
//           Bienvenue
//           {userInfo.Nom && userInfo.Prenom
//             ? `${userInfo.Nom} ${userInfo.Prenom}`
//             : ''}
//         </p>
//       </div>
//       {isEditing ? (
//         <div className='info-container2'>
//           <p>Modification des informations :</p>
//           <label>Nom: </label>
//           <input
//             type='text'
//             name='Nom'
//             value={editedUserInfo.Nom}
//             onChange={handleInputChange}
//           />
//           <label>Prénom: </label>
//           <input
//             type='text'
//             name='Prenom'
//             value={editedUserInfo.Prenom}
//             onChange={handleInputChange}
//           />
//           <label>Adresse email: </label>
//           <input
//             type='text'
//             name='AdresseEmail'
//             value={editedUserInfo.AdresseEmail}
//             onChange={handleInputChange}
//           />
//           <button onClick={handleEnregistrerClick}>Enregistrer</button>
//         </div>
//       ) : (
//         <div className='info-container2'>
//           <p>Information personnelle :</p>
//           <p>Nom: {userInfo.Nom}</p>
//           <p>Prénom: {userInfo.Prenom}</p>
//           <p>Adresse email: {userInfo.AdresseEmail}</p>
//           <button onClick={handleModifierClick}>Modifier</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InfoC;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InfoC.css';

// const InfoC = () => {
//   const [userInfo, setUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [editedUserInfo, setEditedUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEnregistrer, setIsEnregistrer] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user');
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleModifierClick = () => {
//     if (!isEditing) {
//       setEditedUserInfo({ ...userInfo });
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEnregistrerClick = async () => {
//     try {
//       // Send a request to update user information
//       await axios.put('/api/user', editedUserInfo);

//       // Update displayed user information
//       setUserInfo({ ...editedUserInfo });

//       // Exit edit mode
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   return (
//     <div className='info-container'>
//       <div className='bienvenue-container'>
//         <p>
//           Bienvenue
//           {userInfo.Nom && userInfo.Prenom
//             ? `${userInfo.Nom} ${userInfo.Prenom}`
//             : ''}
//         </p>
//       </div>
//       <div className='info-container2'>
//         {isEditing ? (
//           <>
//             <p>Modification des informations :</p>
//             <label>Nom: </label>
//             <input
//               type='text'
//               name='Nom'
//               value={editedUserInfo.Nom}
//               onChange={handleInputChange}
//             />
//             <label>Prénom: </label>
//             <input
//               type='text'
//               name='Prenom'
//               value={editedUserInfo.Prenom}
//               onChange={handleInputChange}
//             />
//             <label>Adresse email: </label>
//             <input
//               type='text'
//               name='AdresseEmail'
//               value={editedUserInfo.AdresseEmail}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleEnregistrerClick}>Enregistrer</button>
//           </>
//         ) : (
//           <>
//             <p>Information personnelle :</p>
//             <p>Nom: {userInfo.Nom}</p>
//             <p>Prénom: {userInfo.Prenom}</p>
//             <p>Adresse email: {userInfo.AdresseEmail}</p>
//             <button onClick={handleModifierClick}>Modifier</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InfoC;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InfoC.css';

// const InfoC = () => {
//   const [userInfo, setUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [editedUserInfo, setEditedUserInfo] = useState({
//     Nom: '',
//     Prenom: '',
//     AdresseEmail: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEnregistrer, setIsEnregistrer] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/user');
//         setUserInfo(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleModifierClick = () => {
//     if (!isEditing) {
//       setEditedUserInfo({ ...userInfo });
//     }
//     setIsEditing(!isEditing);
//     setIsEnregistrer(false); // Reset isEnregistrer when entering edit mode
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEnregistrerClick = async () => {
//     try {
//       // Send a request to update user information
//       await axios.put('/api/user', editedUserInfo);

//       // Update displayed user information
//       setUserInfo({ ...editedUserInfo });

//       // Exit edit mode
//       setIsEditing(false);

//       // Set isEnregistrer to true after successfully saving
//       setIsEnregistrer(true);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//     }
//   };

//   return (
//     <div className='info-container'>
//       <div className='bienvenue-container'>
//         <p>
//           Bienvenue
//           {userInfo.Nom && userInfo.Prenom
//             ? `${userInfo.Nom} ${userInfo.Prenom}`
//             : ''}
//         </p>
//       </div>
//       <div className='info-container2'>
//         {isEditing ? (
//           <>
//             <p>Modification des informations :</p>
//             <label>Nom: </label>
//             <input
//               type='text'
//               name='Nom'
//               value={editedUserInfo.Nom}
//               onChange={handleInputChange}
//             />
//             <label>Prénom: </label>
//             <input
//               type='text'
//               name='Prenom'
//               value={editedUserInfo.Prenom}
//               onChange={handleInputChange}
//             />
//             <label>Adresse email: </label>
//             <input
//               type='text'
//               name='AdresseEmail'
//               value={editedUserInfo.AdresseEmail}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleEnregistrerClick}>Enregistrer</button>
//           </>
//         ) : (
//           <>
//             <p>Information personnelle :</p>
//             <p>Nom: {userInfo.Nom}</p>
//             <p>Prénom: {userInfo.Prenom}</p>
//             <p>Adresse email: {userInfo.AdresseEmail}</p>
//             <button onClick={handleModifierClick}>Modifier</button>
//           </>
//         )}
//       </div>
//       {isEnregistrer && (
//         <div className='info-container2'>
//           <p>Enregistrement réussi!</p>
//           <>
//             <p>Information personnelle :</p>
//             <p>Nom: {userInfo.Nom}</p>
//             <p>Prénom: {userInfo.Prenom}</p>
//             <p>Adresse email: {userInfo.AdresseEmail}</p>
//             <button onClick={handleModifierClick}>Modifier</button>
//           </>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InfoC;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InfoC.css';

const InfoC = () => {
  const [userInfo, setUserInfo] = useState({
    Nom: '',
    Prenom: '',
    AdresseEmail: '',
  });
  const [editedUserInfo, setEditedUserInfo] = useState({
    Nom: '',
    Prenom: '',
    AdresseEmail: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEnregistrer, setIsEnregistrer] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleModifierClick = () => {
    setIsEditing(!isEditing);
    setIsEnregistrer(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnregistrerClick = async () => {
    try {
      // Send a request to update user information
      await axios.put('/api/user', editedUserInfo);

      // Update displayed user information
      setUserInfo({ ...editedUserInfo });

      // Exit edit mode
      setIsEditing(false);
      setIsEnregistrer(true);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className='info-container'>
      <div
        className={`bienvenue-container ${isEnregistrer ? 'slide-left' : ''}`}
      >
        <p>
          Bienvenue
          {userInfo.Nom && userInfo.Prenom
            ? `${userInfo.Nom} ${userInfo.Prenom}`
            : ''}
        </p>
      </div>
      {isEditing ? (
        <div className={`info-container2 ${isEnregistrer ? 'slide-left' : ''}`}>
          <p>Modification des informations :</p>
          <label>Nom: </label>
          <input
            type='text'
            name='Nom'
            value={editedUserInfo.Nom}
            onChange={handleInputChange}
          />
          <label>Prénom: </label>
          <input
            type='text'
            name='Prenom'
            value={editedUserInfo.Prenom}
            onChange={handleInputChange}
          />
          <label>Adresse email: </label>
          <input
            type='text'
            name='AdresseEmail'
            value={editedUserInfo.AdresseEmail}
            onChange={handleInputChange}
          />
          <button onClick={handleEnregistrerClick}>Enregistrer</button>
        </div>
      ) : (
        <div className={`info-container2 ${isEnregistrer ? 'slide-left' : ''}`}>
          <p>Information personnelle :</p>
          <p>Nom: {userInfo.Nom}</p>
          <p>Prénom: {userInfo.Prenom}</p>
          <p>Adresse email: {userInfo.AdresseEmail}</p>
          <button onClick={handleModifierClick}>Modifier</button>
        </div>
      )}
    </div>
  );
};

export default InfoC;
