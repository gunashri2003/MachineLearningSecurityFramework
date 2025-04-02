import React from 'react'
import axios from 'axios';
import { LOCKER_URL } from '../../repository/config';

function LockSystem() {
    const runBatchFile = async () => {
        try {
          const response = await axios.get(LOCKER_URL);
          if (response.status === 200) {
            console.log('Batch file executed successfully');
          } else {
            console.error('Error executing the batch file');
          }
        } catch (error) {
          console.error('Network error', error);
        }
      };
    
      return (
        <div className="App">
          <h1>React App</h1>
          <button onClick={runBatchFile}>Run Batch File</button>
        </div>
      );
}

export default LockSystem