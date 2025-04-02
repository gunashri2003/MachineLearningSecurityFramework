

import React, { useState, ChangeEvent, useEffect } from 'react';
import './scanner.css';

const Scanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [showScanButton, setShowScanButton] = useState(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (!selectedFile || !showScanButton) {
      console.error('No file selected or scanning already in progress.');
      return;
    }

    setShowScanButton(false); // Hide the "Scan File" button
    setScanning(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const requestOptions = {
      method: 'POST',
      body: formData,
      timeout: 10000,
    };

    fetch('http://10.0.0.43:5006/receiveFile', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.features.status[0]);
        const value = data.features.status[0];
        setStatus(value);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      })
      .finally(() => {
        // Reset scanning state after completion
        setScanning(false);
      });
  };

  const getStatusLabel = () => {
    if (status === 'Legitimate' || status === 'Malware') {
      return status;
    } else {
      return 'Scanning...';
    }
  };

  return (
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
      </div>
      { showScanButton && (
        <div>
          <p>Status: {getStatusLabel()}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;


/*

import React, { useState, ChangeEvent, useEffect } from 'react';
import './scanner.css';

const Scanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [showScanButton, setShowScanButton] = useState(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (!selectedFile || !showScanButton) {
      console.error('No file selected or scanning already in progress.');
      return;
    }

    setShowScanButton(false); // Hide the "Scan File" button
    setScanning(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const requestOptions = {
      method: 'POST',
      body: formData,
      timeout: 10000,
    };

    fetch('http://10.0.0.43:5006/receiveFile', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.features.status[0]);
        const value = data.features.status[0];
        setStatus(value);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      })
      .finally(() => {
        // Reset scanning state after completion
        setScanning(false);
      });
  };

  const getStatusLabel = () => {
    if (status === 1) {
      return 'Legitimate';
    } else {
      return 'Malware';
    }
  };

  useEffect(() => {
    // Delay showing the Scan File button for 3 seconds after selecting a file
    const timer = setTimeout(() => {
      setShowScanButton(true);
      setScanning(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [selectedFile]);

  return (
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
      </div>
      <p className="scanner-text"></p>
      {selectedFile && (
        <div>
          <p className="selected-file-text">Selected file: {selectedFile.name}</p> 
        </div>
      )}
      <div>
        <p>Status: {status !== null ? getStatusLabel() : 'Scanning...'}</p>
      </div>
    </div>
  );
};

export default Scanner;
*/



/*import React, { useState, ChangeEvent } from 'react';

import './scanner.css';

const Scanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    const requestOptions = {
      method: 'POST',
      body: formData,
      timeout: 10000, // Set your desired timeout in milliseconds
    };
  
    fetch('http://10.0.0.43:5006/receiveFile', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.features.status[0]);
        
        const value = data.features.status[0];
        setStatus(value);

      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };
  
  const getStatusLabel = () => {
    if (status === 1) {
      return 'Legitimate';
    } else {
      return 'Malware';
    }
  };

  return (
    <div className="scanner-container">
      <div className="scanner-frame">
          {selectedFile && <div className="scanner-light"></div>}
          {selectedFile &&  <div className="scanning-icon"></div>}
      </div>
      <p className="scanner-text"></p>
      <input type="file" accept=".exe, application/x-msdownload" onChange={handleFileChange} />
      {selectedFile && (
        <div>
           <p className="selected-file-text">Selected file: {selectedFile.name}</p> 
          <button onClick={handleFileUpload}>Scan File</button>
        </div>
      )}
    <div>
      <p>Status: {status !== null ? getStatusLabel() : 'Scanning...'}</p>
    </div>
    </div>
  );
};

export default Scanner;

*/
  


/*import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

import './scanner.css';

const Scanner: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log("Form data:");
for (let pair of formData.entries()) {
  const [key, value] = pair;
  if (value instanceof File) {
    console.log(`${key}, name: ${value.name}, size: ${value.size} bytes, type: ${value.type}`);
  } else {
    console.log(`${key}, ${value}`);
  }
}

    axios.post('http://10.0.0.43:5006/receiveFile', formData)
      .then(response => {
        console.log(response.data);
      
      })
      .catch(error => {
        console.error(error);
       
      });
  };

  return (
    <div className="scanner-container">
      <div className="scanner-frame">
        <div className="scanner-light"></div>
      </div>
      <p className="scanner-text">Place your document in the frame</p>
      <input type="file" accept=".exe, application/x-msdownload" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p className="selected-file-text">Selected file: {selectedFile.name}</p>
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
      )}
    </div>
  );
};

export default Scanner;*/
