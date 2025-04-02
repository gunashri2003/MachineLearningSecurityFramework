import React, { useState, useEffect, ChangeEvent } from 'react';
import { useApiCall } from '../../hooks/hooks';
import { useSelector } from 'react-redux';
import { RootState } from "../../store/reducers";
import './user.css'
import { ATTACKER_ADDRESS } from '../../repository/config';
import { toastSuccess } from '../../utils/toastMessages';
import BalanceComponent from '../Balance/BalanceComponent';
import { Buffer } from 'buffer';

const User: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [storeIpfsHash, setStoreIpfsHash] = useState<string | null>(null); 
  const [storeTransactionHash, setStoreTransactionHash] = useState<string | null>(null); 
  const [paymentResult, setPaymentResult] = useState<string | null>(null);
  const [displayHash, setDisplayHash] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  const [displayPayment, setDisplayPayment] = useState(false);
  const [fileStoredSuccessfully, setFileStoredSuccessfully] = useState(false);
  const [fileRetrievedSuccessfully, setFileRetrievedSuccessfully] = useState(false);
  const [paymentSuccess, setPaymentSucess] = useState(false);
  const [loading, setLoading] = useState(true);

  const { storeFile, doPayment, getUserData } = useApiCall();

  const hackerAddress = ATTACKER_ADDRESS;
  const amount = 2.0 * 1e18;

  const { isUserLoggedIn, userBalance } = useSelector(
    (state: RootState) => state.generalReducer
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

 /* const handleStoreFile = async () => {
    

    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    try {
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        if (event.target && event.target.result) {
          const fileContent = event.target.result as string;

          
          const result = await storeFile(fileContent);
          if(result?.ipfsHash && result?.blockchainHash)
          {
            toastSuccess(" File added successfully");
            setStoreIpfsHash(result.ipfsHash);
            setStoreTransactionHash(result.blockchainHash);
            setFileStoredSuccessfully(true);
            setDisplayHash(true);

          setTimeout(() => {
            setDisplayHash(false);
          }, 5000);
          }
          console.log(result?.ipfsHash)
          console.log(result?.blockchainHash);
          console.log("Result "+result)
        }
      };

      // Read the content of the selected file as text
      fileReader.readAsText(selectedFile);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };*/

  const handleStoreFile = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        if (event.target && event.target.result) {
          const fileContent = Buffer.from(new Uint8Array(event.target.result as ArrayBuffer));
  
          // Get filename and extension
          const fileName = selectedFile.name;
  
          const result = await storeFile(fileContent, fileName);
          if (result?.ipfsHash && result?.blockchainHash) {
            toastSuccess("File added successfully");
            setStoreIpfsHash(result.ipfsHash);
            setStoreTransactionHash(result.blockchainHash);
            setFileStoredSuccessfully(true);
            setDisplayHash(true);
  
            setTimeout(() => {
              setDisplayHash(false);
            }, 5000);
          }
          console.log(result?.ipfsHash);
          console.log(result?.blockchainHash);
          console.log("Result " + result);
        }
      };
  
      // Read the content of the selected file as ArrayBuffer
      fileReader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  
   


  const performPayment = async () => {
    try {
      const result = await doPayment(hackerAddress, amount);
      console.log("Result in payment "+result)
      if (result){
        setPaymentResult(result);
        setDisplayPayment(true);
        setTimeout(() => {
          setDisplayPayment(false);
        }, 5000);
      }
      
    } catch (error) {
      console.log("Payment gone")
      console.error("Error during payment:", error);
      setPaymentResult('Transaction Failed!!!');
    } finally {
      setLoading(false); 
    }
  };


  const handleGetFile = async () => {
    try {
      const result = await getUserData();

        if(result)
        {
          setFileRetrievedSuccessfully(true);
          setDisplayText(true);

          setTimeout(() => {
            setDisplayText(false);
          }, 5000);
        }

      console.log("Result  "+result)
      
      
    } catch (error) {
      
      console.error("Error during retrieval:", error);
      
    } 
  };

  return (
    <div className='user-container'>
      {/* {isUserLoggedIn && ( */}
         <BalanceComponent  accountAddress="0x05F6300a56609A7Bf3197DF60c80EbD881f21ce4" />
      {/* )} */}
      <div className="file-input-container">
        {!displayHash && !displayText && !displayPayment && (
          <>
            <label className="custom-button" htmlFor="fileInput">
              Choose File
            </label>
            <input
              id="fileInput"
              className="file-input"
              type="file"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <span className="file-name">{selectedFile.name}</span>
            )}
          </>
        )}
      </div>
      {!displayHash && !displayText && !displayPayment && (
          <>
            <button className="action-button1" onClick={handleStoreFile}>
                Store File on IPFS
            </button>

            <button className="action-button2" onClick={handleGetFile} disabled={!fileStoredSuccessfully} >
                Retrieve File
            </button>

            <button className="action-button3" onClick={performPayment}>
                Perform Payment
            </button>
      </>
      )}

      {displayHash && storeTransactionHash && storeIpfsHash &&(
         <textarea
         className="file-hash-input"
         readOnly
         value={`IPFS HASH: ${storeIpfsHash}\n\nBLOCKCHAIN HASH: ${storeTransactionHash}`}
       />
      )}

      {displayText && fileRetrievedSuccessfully &&(
         <textarea
         className="file-hash-input"
         readOnly
         value={`FILE RETRIEVED SUCCESSFULLY!!!`}
       />
      )}

      {displayPayment && paymentResult &&(
         <textarea
         className="file-hash-input"
         readOnly
         value={`Transaction Success..... \n TRANSACION HASH: ${paymentResult}`}
       />
      )}    
    </div>
  );
  
};

export default User;
