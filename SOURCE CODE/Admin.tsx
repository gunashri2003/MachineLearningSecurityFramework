import React, { useState } from 'react';
import { ImArrowRight } from 'react-icons/im';
import UserDetails from '../UserDetails/UserDetails';
import './admin.css';


const Data = [
  {
    id: 1,
    title: 'User',
  },
  {
    id: 2,
    title: 'Attacker',
  }
];

function Admin() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedTexts, setSelectedTexts] = useState<string[]>([]);
  const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);

  const getButtonText = (id: number) => {
    switch (id) {
      case 1:
        return 'Add User';
      case 2:
        return 'Add Attacker';
      default:
        return 'Add';
    }
  };

  const handleLogin = (id: number, text: string) => {
    if (selectedIds.includes(id)) {
      // If ID is already selected, remove it from the state
      const updatedIds = selectedIds.filter(selectedId => selectedId !== id);
      const updatedTexts = selectedTexts.filter((_, index) => selectedIds[index] !== id);

      setSelectedIds(updatedIds);
      setSelectedTexts(updatedTexts);
      setIsUserDetailsVisible(false);
    } else {
      // If ID is not selected, add it to the state
      setSelectedIds([...selectedIds, id]);
      setSelectedTexts([...selectedTexts, text]);
      setIsUserDetailsVisible(true);
    }
  };

  return (
    <div className='admin-container'>
      <section className="main container section">
        <div className="secContent grid">
          {Data.map(({ id, title }) => {
            const isSelected = id === selectedIds[selectedIds.length - 1];
            const selectedText = isSelected ? selectedTexts[selectedIds.indexOf(id)] : '';

            return (
              <div data-aos="fade-up" key={id} className="singleDestination">
                <div className="cardInfo">
                  <button
                    onClick={() => handleLogin(id, title)}
                    className={`btn flex ${id === 1 ? 'addUser' : 'addAttacker'}`}
                  >
                    {getButtonText(id)} <ImArrowRight />
                  </button>
                  {isSelected && <UserDetails userId={id} text={selectedText} isVisible={isUserDetailsVisible} setIsVisible={setIsUserDetailsVisible} />}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Admin;





/*import React, { useEffect, useState } from 'react'
import { ImArrowRight } from 'react-icons/im';
import UserDetails from '../UserDetails/UserDetails';
import './admin.css';

const Data = [
    {
      id: 1,
      title: 'User',
    },
    {
      id: 2,
      title: 'Attacker',
    }
  ];


function Admin() {



    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectedTexts, setSelectedTexts] = useState<string[]>([]);
    const [isUserDetailsVisible,  setIsUserDetailsVisible] = useState(false);
  
  
    const getButtonText = (id: number) => {
      switch (id) {
        case 1:
          return 'Add User';
        case 2:
          return 'Add Attacker';
        default:
          return 'Add';
      }
    };

    const handleLogin = (id: number, text: string) => {
      if (selectedIds.includes(id)) {
        // If ID is already selected, remove it from the state
        const updatedIds = selectedIds.filter(selectedId => selectedId !== id);
        const updatedTexts = selectedTexts.filter((_, index) => selectedIds[index] !== id);
    
        setSelectedIds(updatedIds);
        setSelectedTexts(updatedTexts);
        setIsUserDetailsVisible(false);
      } else {
        // If ID is not selected, add it to the state
        setSelectedIds([...selectedIds, id]);
        setSelectedTexts([...selectedTexts, text]);
        setIsUserDetailsVisible(true);
      }
    };
    
  
    

    // const handleLogin = (id: number, text: string) => {
    //   if (!selectedIds.includes(id)) {
    //     setSelectedIds([...selectedIds, id]);
    //     setSelectedTexts([...selectedTexts, text]);
    //     setIsUserDetailsVisible(true);
    //   }
    // };
  
    return (
      <div className='admin-container'>
      <section className="main container section">
        <div className="secContent grid">
          {Data.map(({ id, title }) => {
            const isSelected = selectedIds.includes(id);
            const selectedText = isSelected ? selectedTexts[selectedIds.indexOf(id)] : '';
            return (
              <div data-aos="fade-up" key={id} className="singleDestination">
                <div className="cardInfo">
                  
                  
                 
              <button onClick={() => handleLogin(id, title)} className={`btn flex ${id === 1 ? 'addUser' : 'addAttacker'}`}>
                  {getButtonText(id)} <ImArrowRight />
              </button>

                  {isSelected && <UserDetails userId={id} text={selectedText} isVisible={isUserDetailsVisible} setIsVisible={setIsUserDetailsVisible} />}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      </div>
    );
}

export default Admin  */