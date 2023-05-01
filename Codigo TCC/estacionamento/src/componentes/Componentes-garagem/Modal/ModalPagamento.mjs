import React, { useState,useRef } from 'react';
import styles from './Modal.module.css'


export default function ModalPagamento({isOpen}){
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const teste = useRef(null)

  const closeModal = () => {
    setIsModalOpen(false);
    if(isModalOpen === false){
      teste.current.style.display = 'none'
    }
  
    
    console.log(isModalOpen)
  };

  return (
  
    <div ref={teste} className={styles.container}>

    <button  onClick={()=>{closeModal()}}>Close</button>
 
    </div>   
   
  );
};

