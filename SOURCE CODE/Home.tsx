import React, { ChangeEvent, useEffect, useState } from 'react';
import './home.css';
import { SCAN_URL } from '../../repository/config';

const Home = () => {

    const [resultDisplay, setResultDisplay] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [scanning, setScanning] = useState(false);
    const [showScanButton, setShowScanButton] = useState(true);
    const [result, setResult] = useState(false);


    const resetAllStates = () => {
      setResultDisplay(false);
      setResult(false);
      setShowScanButton(true);
      setSelectedFile(null);
      setStatus(null);
      setScanning(false);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setSelectedFile(file || null);
    };
  
    const handleFileUpload = () => {
      if (!selectedFile || !showScanButton) {
        console.error('No file selected or scanning already in progress.');
        return;
      }
  
      setShowScanButton(false); 
      setScanning(true);
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const requestOptions = {
        method: 'POST',
        body: formData,
        timeout: 10000,
      };
  
      fetch(SCAN_URL, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data.features.status[0]);
          const value = data.features.status[0];
          setResult(true);
      
      setTimeout(() => {
        setStatus(value); // Set the status after the delay
        setScanning(false); // Reset scanning state after the delay
        setResultDisplay(true);
      }, 7000);
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setScanning(false); // Reset scanning state if there's an error
      setResultDisplay(true);
    });
       
    };


    useEffect(() => {
      let resultDisplayTimer;
  
      if (resultDisplay) {
        resultDisplayTimer = setTimeout(() => {
          resetAllStates();
        }, 10000);
      }
  
      return () => clearTimeout(resultDisplayTimer);
    }, [resultDisplay]);
   

  
    const getStatusLabel = () => {
      if (status == '1') 
      {
       
        console.log("Legitimate is a String "+status)
        return 'Legitimate';
      }
      else if(status == '0')
      {
        
        console.log("Malware is a String "+status)
        return 'Malware';
      }
       else {
        console.log("Status "+status)
        return 'Scanning...';
      }
    };
  



  return (
    <div className="home-container">
      <div className="scanner-container">
        <div className="scanner-frame">
          {!scanning && !selectedFile && showScanButton && (
            <input type="file" accept=".exe, application/x-msdownload" onChange={handleFileChange} />
          )}
          {!scanning && selectedFile && showScanButton && (
            <button className="scanner-button" onClick={handleFileUpload}>Scan File</button>
          )}
          {scanning && <div className="scanner-light"></div>}
          {scanning && <div className="scanning-icon"></div>}

          {!scanning && getStatusLabel() == 'Malware' && (
            <img src="/images/malware.jpg" alt="Malware Detected" className="status-image" />
          )}
          {!scanning && getStatusLabel() == 'Legitimate' && (
            <img src="/images/legitimate.jpg" alt="Legitimate File" className="status-image" />
          )}
        </div>
       
          
       
        {result && ( 
         <div className={`status-box ${getStatusLabel() === 'Malware' ? 'blink-red' : 'blink-green'}`}>
            <p className="status-container">Status: {getStatusLabel()}</p>
          </div>
          )}
         
      </div>
    </div>
  );
}

export default Home;
