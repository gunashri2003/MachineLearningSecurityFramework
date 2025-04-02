import React, { useState, useEffect } from 'react';
import { useApiCall } from '../../hooks/hooks';

interface BalanceComponentProps {
  accountAddress: string;
}

const BalanceComponent: React.FC<BalanceComponentProps> = () => {
    const { getBalance } = useApiCall();
    const [balance, setBalance] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchBalance = async () => {
        try {
          const result = await getBalance();
  
          // Convert the result to a number
          const balanceNumber = parseFloat(result);
  
          // Check if balanceNumber is a valid number before setting the balance
          if (!isNaN(balanceNumber)) {
            setBalance(balanceNumber);
          } else {
            console.error("Invalid balance value:", result);
          }
        } catch (error) {
          console.error("Error while retrieving balance:", error);
        }
      };
  
      fetchBalance();
    }, [ getBalance]);
  
    const containerStyle: React.CSSProperties = {
      position: 'fixed',
      top: 90,
      right: 60,
      padding: '10px',
      background: 'white',
      borderRadius: '5px',
    };

    const balanceTextStyle: React.CSSProperties = {
        fontWeight: 'bold',
        color: '#000', // Black color
      };
  
    
    return (
      <div style={containerStyle}>
         <span style={balanceTextStyle}>Balance: </span>
         <span style={{ ...balanceTextStyle, color: 'green' }}>
            {balance !== null ? `${balance.toFixed(2)} ETH` : 'Loading...'}
         </span>
      </div>
    );
  };
  
  export default BalanceComponent;
  
