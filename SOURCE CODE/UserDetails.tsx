import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useApiCall } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import './userdetails.css';

interface UserDetailsProps {
  userId: number;
  text?: string | null;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
 
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, text , isVisible, setIsVisible }: UserDetailsProps) => {

  const [newUserDetails, setNewUserDetails] = useState({
    name: '',
    email: '',
    id_: '',
  });
  const [error, setError] = useState({ name: false, email: false, id_: false });
  

  const { userDetails } = useSelector((state: RootState) => state.generalReducer);

  const { loading, addUsers } = useApiCall();

  const navigate = useNavigate();

  function validate() {
    if (!newUserDetails.email.includes('@')) {
      setError((curr) => ({ ...curr, email: true }));
      return false;
    } else if (newUserDetails.name.length < 3) {
      setError((curr) => ({ ...curr, name: true }));
      return false;
    } else if (userDetails.role !== 0 && userDetails.role < 3 && newUserDetails.id_.length < 42) {
      setError((curr) => ({ ...curr, id_: true }));
      return false;
    }
    setError({ name: false, email: false, id_: false });
    return true;
  }

  async function handleAddUser() {
    try {
      if (validate()) {
        await addUsers({
          ...newUserDetails,
          role: userDetails.role + userId,
        });

        setNewUserDetails({
          name: '',
          email: '',
          id_: '',
        });
      }
    } catch (error) {
      console.error('Error occurs at handleAddUser - UserDetails Component ' + error);
    }
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  
  
  return (
    <>
    {isVisible && (
    <div className='container'>
    <div className='user-details-container'>
         
    <button className="close-button" onClick={handleClose}>X</button>
        <h3>Add {text} Data</h3>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Admin"
            value={newUserDetails.name}
            onChange={(e) =>
              setNewUserDetails((curr) => ({ ...curr, name: e.target.value }))
            }
          />
          {error.name && <p>Invalid Name, It should be more than 3 characters!</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="admin@gts.com"
            value={newUserDetails.email}
            onChange={(e) =>
              setNewUserDetails((curr) => ({ ...curr, email: e.target.value }))
            }
          />
          {error.email && <p>Invalid Email</p>}
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="0x2D8706E94E187c4E1806a8F5b4c1e5xasdf460784D"
            value={newUserDetails.id_}
            onChange={(e) =>
              setNewUserDetails((curr) => ({ ...curr, id_: e.target.value }))
            }
          />
          {error.id_ && <p>Invalid address, It should be more than 3 characters!</p>}
        </div>
        {loading ? (
          <button disabled>Adding...</button>
        ) : (
          <button className='user-button' onClick={handleAddUser}>Add {text}</button>
        )}
      </div>
    
    </div>
    )}
    </>
  );
};

export default UserDetails;






/*import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useApiCall } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import './userdetails.css';

interface UserDetailsProps {
  userId: number;
  text?: string | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, text }: UserDetailsProps) => {
  const [newUserDetails, setNewUserDetails] = useState({
    name: '',
    email: '',
    id_: '',
  });
  const [error, setError] = useState({ name: false, email: false, id_: false });

  const { userDetails } = useSelector((state: RootState) => state.generalReducer);

  const { loading, addUsers } = useApiCall();

  const navigate = useNavigate();

  function validate() {
    if (!newUserDetails.email.includes('@')) {
      setError((curr) => ({ ...curr, email: true }));
      return false;
    } else if (newUserDetails.name.length < 3) {
      setError((curr) => ({ ...curr, name: true }));
      return false;
    } else if (userDetails.role !== 0 && userDetails.role < 3 && newUserDetails.id_.length < 42) {
      setError((curr) => ({ ...curr, id_: true }));
      return false;
    }
    setError({ name: false, email: false, id_: false });
    return true;
  }

  async function handleAddUser() {
    try {
      console.log('In handle Add User UserRole Check ' + userDetails.role);
      if (validate()) {
        await addUsers({
          ...newUserDetails,
          role: userDetails.role + userId,
        });

        console.log('id_ in handleAddUser ' + newUserDetails.id_);

        setNewUserDetails({
          name: '',
          email: '',
          id_: '',
        });
      }
    } catch (error) {
      console.error('Error occurs at handleAddUser - UserDetails Component ' + error);
    }
  }

  return (
    <>
      <div className="user-details-container">
        <h3>Add {text} Data</h3>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Admin"
            value={newUserDetails.name}
            onChange={(e) =>
              setNewUserDetails((curr) => ({ ...curr, name: e.target.value }))
            }
          />
          {error.name && <p>Invalid Name, It should be more than 3 characters!</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="admin@gts.com"
            value={newUserDetails.email}
            onChange={(e) =>
              setNewUserDetails((curr) => ({ ...curr, email: e.target.value }))
            }
          />
          {error.email && <p>Invalid Email</p>}
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="0x2D8706E94E187c4E1806a8F5b4c1e5xasdf460784D"
            value={newUserDetails.id_}
            onChange={(e) =>
              setNewUserDetails((curr) => ({ ...curr, id_: e.target.value }))
            }
          />
          {error.id_ && <p>Invalid address, It should be more than 3 characters!</p>}
        </div>
        {loading ? (
          <button disabled>Adding...</button>
        ) : (
          <button onClick={handleAddUser}>Add {text}</button>
        )}
      </div>
    </>
  );
};

export default UserDetails;
*/




/*import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useApiCall } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

interface UserDetailsProps {
  userId: number;
  text?: string | null; 
  
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, text }: UserDetailsProps) => {
  
  const [newUserDetails, setNewUserDetails] = useState({
    name: "",
    email: "",
    id_: "",
  });
  const [error, setError] = useState({ name: false, email: false, id_: false });
 
  

  const { userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );


  const { loading, addUsers } = useApiCall();

  const navigate = useNavigate();
  
  function validate() {
    if (!newUserDetails.email.includes("@")) {
      setError((curr) => ({ ...curr, email: true }));
      return false;
    } else if (newUserDetails.name.length < 3) {
      setError((curr) => ({ ...curr, name: true }));
      return false;
    } else if (userDetails.role !== 0 && userDetails.role < 3 && newUserDetails.id_.length < 42) {
      setError((curr) => ({ ...curr, id_: true }));
      return false;
    }
    setError({ name: false, email: false, id_: false });
    return true;
  }

  async function handleAddUser() {
    
    

    try {
      console.log("In handle Add User UserRole Check "+userDetails.role);
      if (validate()) {
        await addUsers({
          ...newUserDetails,
          role: userDetails.role + userId,

        });
        
       
        console.log("id_ in handleAddUser "+newUserDetails.id_);

        setNewUserDetails({
          name: "",
          email: "",
          id_: "",
        });
        

        
      }
      
    } catch (error) {
      console.error("Error occurs at handleAddUser - UserDetails Component "+error);
    }
  }

 
  
  return (
    <>
    <div
    style={{
      borderRadius: "8px",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
      backgroundColor: "green",
      width: "70vw",
      maxWidth: "30%",
      alignItems: "center",
      padding: "20px",
      marginLeft: "250px",
      margin: "0 auto",
      marginTop: "50px"
    }}
  >
    <h3 style={{ marginBottom: "20px" }}>Add { text } Data</h3>
    <div style={{ marginBottom: "20px" }}>
      <label>Name</label>
      <input
        type="text"
        placeholder="Admin"
        value={newUserDetails.name}
        onChange={(e) =>
          setNewUserDetails((curr) => ({ ...curr, name: e.target.value }))
        }
      />
      {error.name && (
        <p style={{ fontSize: "12px", color: "red" }}>
          Invalid Name, It should be more than 3 characters!
        </p>
      )}
    </div>
    <div style={{ marginBottom: "20px" }}>
      <label>Email</label>
      <input
        type="text"
        placeholder="admin@gts.com"
        value={newUserDetails.email}
        onChange={(e) =>
          setNewUserDetails((curr) => ({ ...curr, email: e.target.value }))
        }
      />
      {error.email && (
        <p style={{ fontSize: "12px", color: "red" }}>Invalid Email</p>
      )}
    </div>
    <div style={{ marginBottom: "20px" }}>
      <label>Address</label>
      <input
        type="text"
        placeholder="0x2D8706E94E187c4E1806a8F5b4c1e5xasdf460784D"
        value={newUserDetails.id_}
        onChange={(e) =>
          setNewUserDetails((curr) => ({ ...curr, id_: e.target.value }))
        }
      />
      {error.id_ && (
        <p style={{ fontSize: "12px", color: "red" }}>
          Invalid address, It should be more than 3 characters!
        </p>
      )}
    </div>
    {loading ? (
      <button
        style={{
          alignSelf: "center",
          minWidth: "150px",
          marginTop: "10px",
          backgroundColor: "violet",
          color: "white",
          cursor: "not-allowed",
        }}
        disabled
      >
        Adding...
      </button>
    ) : (
      <>
      
          <button
              style={{
                alignSelf: "center",
                minWidth: "150px",
                marginTop: "10px",
                backgroundColor: "violet",
                color: "white",
              }}
              onClick={handleAddUser}
            >
              Add {text}
            </button>
      </>
    )}
  </div>
 
   </>
);
}

export default UserDetails*/