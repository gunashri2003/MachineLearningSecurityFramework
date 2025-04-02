import React, { ReactElement, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './hacker.css';
import HackerMaskAnimation from './HackerMaskAnimation';
import { LOCKER_URL ,DECRYPT_URL, ENCRYPTED_FOLDER_PATH, ENCRYPT_URL, FOLDER_PATH, PASSWORD } from '../../repository/config';
import BalanceComponent from '../Balance/BalanceComponent';


const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};


function Hacker() {

  const [showEyes, setShowEyes] = useState(false);
  const [buttons, setButtons] = useState<ReactElement[]>([]);
  const [showMask, setShowMask] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState('locker');
  const [showHackButton, setShowHackButton] = useState(false);
  const [encryptionResponse, setEncryptionResponse] = useState('');
  const [decryptionResponse, setDecryptionResponse] = useState('');

  useEffect(() => {
    const simulateLogin = async () => {
      setShowMask(true);

      await new Promise(resolve => setTimeout(resolve, 3000));

      setShowMask(false);
      setAnimationCompleted(true);
    };

    const waitForLoginAndAnimation = async () => {
      await Promise.all([simulateLogin(), new Promise(resolve => setTimeout(resolve, 8000))]);

      setShowHackButton(true);
    };

    waitForLoginAndAnimation();
  }, []);


  useEffect(() => {
    // Use useEffect to hide the eyes after 3 seconds
    const eyesTimer = setTimeout(() => {
      setShowEyes(false);
    }, 20000);

    return () => clearTimeout(eyesTimer); // Clear the timer when the component unmounts or when setShowEyes is updated
  }, []);


  const handleLockerAttackClick = async () => {
    try {
      setOverlayType('locker');
      setShowOverlay(true);

      const response = await fetch(LOCKER_URL);

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
      } else {
        console.log('Batch file executed successfully');
      }

      // setTimeout(() => {
      //   setShowOverlay(false);
      // }, 4000);
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
    }
  };

  const handleEncryptData = async () => {
    console.log('Encrypt button is clicked');
    try {
      console.log('Encrypt button is clicked');
      const response = await fetch(ENCRYPT_URL , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderPath: FOLDER_PATH,
          password: PASSWORD,
        }),
      });

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        setEncryptionResponse(`Internal Server Error: ${response.status}`);
      } else {
        console.log('Encryption successful');
        setEncryptionResponse(`File Successfully Encrypted!!!!!`);
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      setEncryptionResponse(`Internal Server Error: ${error.message}`);
    }

    // setTimeout(() => {
    //   setEncryptionResponse('');
    // }, 5000);
  };

  const handleDecryptData = async () => {
    try {
      console.log('Decrypt button is clicked');
      const response = await fetch(DECRYPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encryptedFilePath: ENCRYPTED_FOLDER_PATH,
          password: PASSWORD,
        }),
      });

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        setDecryptionResponse(`Internal Server Error: ${response.status}`);
      } else {
        console.log('Decryption successful');
        setDecryptionResponse(`Decryption Successful: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      setDecryptionResponse(`Internal Server Error: ${error.message}`);
    }

    setTimeout(() => {
      setDecryptionResponse('');
    }, 5000);
  };


  const handleCryptoAttackClick = () => {
    console.log('Crypto Attack button is clicked');
     setShowOverlay(false); 
     setOverlayType('crypto');
     setShowOverlay(true);

    const newButtons: ReactElement[] = [
      
      <motion.button
        key={3}
        className="button crypto-encrypt-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleEncryptData}
      >
        Encrypt Data
      </motion.button>,
      <motion.button
        key={4}
        className="button crypto-decrypt-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleDecryptData}
      >
        Decrypt Data
      </motion.button>,
    ];

    setButtons(newButtons);
    console.log(newButtons);
    

  };

  const handleButtonClick = () => {
    console.log('Button is clicked');
    
    const newButtons: ReactElement[] = [
      <motion.button
        key={1}
        className="button locker-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleLockerAttackClick}
      >
        Locker Attack
      </motion.button>,
      <motion.button
        key={2}
        className="button crypto-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleCryptoAttackClick}
      >
        Crypto Attack
      </motion.button>,
    ];

    setButtons(newButtons);
  };

  const handleAnimationComplete = () => {
    console.log('Hacker mask animation complete');
    setAnimationCompleted(true);
    setTimeout(() => {
      setShowEyes(true);
    }, 3000);
  };


    const shouldShowEyes = animationCompleted && showEyes;
  
  const renderEyes = () => (
    
    <div className="eyes-container">
      {shouldShowEyes && (
        <>
          <span role="img" aria-label="Left Eye" className={`swag-eyes left-eye`}>
            👁️‍🗨️
          </span>
          <span role="img" aria-label="Right Eye" className={`swag-eyes right-eye`}>
            👁️‍🗨️
          </span>
        </>
      )}
    </div>
  );
  

  const renderHackButton = () => (
    <motion.button
      className="hack-button"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      onClick={handleButtonClick}
      disabled={loading}
    >
      Hack Mode
    </motion.button>
  );


  return (
    <div className='hacker-container'>
      <BalanceComponent  accountAddress="" />
      {showMask && <HackerMaskAnimation onAnimationComplete={handleAnimationComplete} />}
      {showOverlay && (
      <div className="overlay">
        <img src={process.env.PUBLIC_URL + `/images/${overlayType}.png`} alt={`${overlayType} Overlay Image`} />
      </div>
      )}
      <div className="button-container">
        {animationCompleted && showHackButton ? renderHackButton() : renderEyes()}
      </div>

      <div>
        {buttons}
      </div>

      <div className='encryption-input-container'>
        
          { encryptionResponse && (
             <textarea
             className="encryption-input"
             readOnly
             value={`${encryptionResponse}`}
           />
          )}
      </div>

      <div>
          { decryptionResponse && (
             <textarea
             className="decryption-input"
             readOnly
             value={`${decryptionResponse}`}
           />
          )}
      </div>

    </div>
  );
}

export default Hacker;





/*import React, { ReactElement, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './hacker.css';
import HackerMaskAnimation from './HackerMaskAnimation';
import { ENCRYPTED_FOLDER_PATH, FOLDER_PATH, PASSWORD } from '../../repository/config';

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Hacker() {
  const [buttons, setButtons] = useState<ReactElement[]>([]);
  const [showMask, setShowMask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Simulate the login process
    const simulateLogin = async () => {
      setShowMask(true);

      // Simulating an asynchronous operation (e.g., API call)
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Hide the mask after the login process
      setShowMask(false);
    };

    // Call the function when the component mounts
    simulateLogin();
  }, []); // Empty dependency array to run once on mount

  const handleLockerAttackClick = async () => {
    try {

      setShowOverlay(true);
      const response = await fetch('http://localhost:3001/runBatchFile');

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        // Handle error as needed
      } else {
        console.log('Batch file executed successfully');
        // Handle success as needed
      }

      setTimeout(() => {
        setShowOverlay(false);
      }, 4000);

    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      // Handle error as needed
    }
  };

  const handleEncryptData = async () => {
    try {
      console.log('Encrypt button is clicked');
      const response = await fetch('http://localhost:3002/encryptData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderPath: FOLDER_PATH, // Replace with the actual folder path
          password: PASSWORD, // Replace with the actual password
        }),
      });

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        // Handle error as needed
      } else {
        console.log('Encryption successful');
        // Handle success as needed
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      // Handle error as needed
    }
  };

  const handleDecryptData = async () => {
    try {
      console.log('Decrypt button is clicked');
      const response = await fetch('http://localhost:3003/decryptData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encryptedFilePath: ENCRYPTED_FOLDER_PATH,
          password: PASSWORD,
        }),
      });

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        // Handle error as needed
      } else {
        console.log('Decryption successful');
        // Handle success as needed
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      // Handle error as needed
    }
  };

  
  const handleCryptoAttackClick = () => {
    console.log('Crypto Attack button is clicked');
    

    const newButtons: ReactElement[] = [
      <motion.button
        key={3}
        className="button crypto-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleEncryptData}
      >
        Encrypt Data
      </motion.button>,
      <motion.button
        key={4}
        className="button crypto-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleDecryptData}
      >
        Decrypt Data
      </motion.button>,
    ];

    setButtons(newButtons);
  };

  const handleButtonClick = () => {
    console.log('Button is clicked');
    const newButtons: ReactElement[] = [
      <motion.button
        key={1}
        className="button locker-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleLockerAttackClick}
      >
        Locker Attack
      </motion.button>,
      <motion.button
        key={2}
        className="button crypto-button"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onClick={handleCryptoAttackClick}
      >
        Crypto Attack
      </motion.button>,
    ];

    setButtons(newButtons);
  };


  const handleAnimationComplete = () => {
    // This callback is called when the animation completes
    console.log('Hacker mask animation complete');
  };

  return (
    <div>
      {showMask && <HackerMaskAnimation onAnimationComplete={handleAnimationComplete} />}
{showOverlay && <div className="overlay"><img src={process.env.PUBLIC_URL + '/images/locker.png'} alt="Overlay Image" /></div>}
{showOverlay && <div className="overlay"><img src={process.env.PUBLIC_URL + imgSrc} alt="Overlay Image" /></div>}
 <div className="button-container">
        <motion.button
          className="hack-button"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Hacking...' : 'Hack Mode'}
        </motion.button>
      </div>

      <div>
        {buttons}
      </div>
    </div>
  );
}

export default Hacker;*/





/*import React, { ReactElement, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './hacker.css';
import HackerMaskAnimation from './HackerMaskAnimation';
import {  ENCRYPTED_FOLDER_PATH, FOLDER_PATH, PASSWORD } from '../../repository/config';

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Hacker() {
  const [buttons, setButtons] = useState<ReactElement[]>([]);
  const [showMask, setShowMask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate the login process
    const simulateLogin = async () => {
      setShowMask(true);

      // Simulating an asynchronous operation (e.g., API call)
      await new Promise(resolve => setTimeout(resolve, 5000));
        
      // Hide the mask after the login process
      setShowMask(false);
    };

    // Call the function when the component mounts
    simulateLogin();
  }, []); // Empty dependency array to run once on mount

  const handleLockerAttackClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/runBatchFile');
      
      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        // Handle error as needed
      } else {
        console.log('Batch file executed successfully');
        // Handle success as needed
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      // Handle error as needed
    }
  };


  const handleEncryptData = async () => {
    try {
      console.log("Encrypt button is clicked")
      const response = await fetch('http://localhost:3002/encryptData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderPath: FOLDER_PATH, // Replace with the actual folder path
          password: PASSWORD, // Replace with the actual password
        }),
      });

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        // Handle error as needed
      } else {
        console.log('Encryption successful');
        // Handle success as needed
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      // Handle error as needed
    }
  };

  const handleDecryptData = async () => {
    try {
      console.log("Decrypt button is clicked")
      const response = await fetch('http://localhost:3003/decryptData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encryptedFilePath: ENCRYPTED_FOLDER_PATH, 
          password: PASSWORD, 
        }),
      });

      if (!response.ok) {
        console.error(`Error calling server: ${response.status}`);
        // Handle error as needed
      } else {
        console.log('Decryption successful');
        // Handle success as needed
      }
    } catch (error) {
      console.error(`Error calling server: ${error.message}`);
      // Handle error as needed
    }
  };

  const handleCryptoAttackClick = () => {
    console.log("Crypto Attack button is clicked");
    const newButtons: ReactElement[] = [
      <motion.button key={3} className="button" variants={buttonVariants} initial="hidden" animate="visible"  onClick={handleEncryptData}>Encrypt Data</motion.button>,
      <motion.button key={4} className="button" variants={buttonVariants} initial="hidden" animate="visible" onClick={handleDecryptData}>Decrypt Data</motion.button>,
    ];

    setButtons(newButtons);
  };

  const handleButtonClick = () => {
    console.log("Button is clicked");
    const newButtons: ReactElement[] = [
      <motion.button key={1} className="button" variants={buttonVariants} initial="hidden" animate="visible" onClick={handleLockerAttackClick}>
        Locker Attack
      </motion.button>,
      <motion.button key={2} className="button" variants={buttonVariants} initial="hidden" animate="visible" onClick={handleCryptoAttackClick}>
        Crypto Attack
      </motion.button>,
    ];

    setButtons(newButtons);
  };

  const handleAnimationComplete = () => {
    // This callback is called when the animation completes
    console.log('Hacker mask animation complete');
  };

  return (
    <div>
      {showMask && <HackerMaskAnimation onAnimationComplete={handleAnimationComplete} />}
      <div className="button-container">
        <motion.button
          className="hack-button"  
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Hacking...' : 'Hack Mode'}
        </motion.button>
      </div>
      

      <div>
        {buttons}
      </div>
    </div>
  );
}

export default Hacker;  */