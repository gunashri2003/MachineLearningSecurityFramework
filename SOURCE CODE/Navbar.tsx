import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetStates } from '../../store/actions/action';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[active, setActive] = useState('navBar');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const showNav =  ()=>{
      setActive('navBar activeNavbar')
  }

  const removeNavbar =  ()=>{
      setActive('navBar')
  }

    const handleLogout = () => {
        // Clear user data and log out
        dispatch(resetStates());
        window.localStorage.clear();
        console.log('User Logged Out');
        setIsLoggedIn(false); // Update the login status
        navigate('/'); // Redirect to the root path
      };
      

    const handleLogin = () => {
        console.log("Login button at Navbar is clicked");
        console.log('Login button at Navbar is clicked');
        setIsLoggedIn(true); // Update the login status
        navigate('/navigation');
       
      };

    return(

        <section className='navBarSection'>

              <div className="logo">
                  <img src="images/shield.png" alt="Logo" />
              </div>

              <div className="appName">
                  RANSHIELD
              </div>

              
        <div className='homecontainer'>
          <Link to="/">Home</Link>
        </div>
        
      

              <button className="btn" onClick={isLoggedIn ? handleLogout : handleLogin}>
                             {isLoggedIn ? 'Logout' : 'Login'}
                    </button>
        </section>
    );
}
export default Navbar;