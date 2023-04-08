import styles from '../css_pages/Garagem.module.css';
import Vagas from '../Componentes-garagem/Vagas/VagasGestao.js';
import InfosCar from '../info-side/InfosCar';
import Navbar from '../layout/Navbar';
import { useState,useRef } from 'react';

function Garagem(){
  const [hide,setHide] = useState(false) 
  const newContainer = useRef(null)

  function hideInfos(){
    newContainer.current.style.width = "20px"
    setHide(true)
  }


  function showInfos(){
   newContainer.current.style.width = "520px"
   setHide(false)
  }
  
    return(  
    <div className = {styles.bodyGarage}>
     
     <Navbar/>
     <Vagas/> 
     <div ref={newContainer} className={styles.container}>
      <div className={styles.closeInfos}>
        {hide === false &&(
           <button className={!hide === true ? styles.hideInfo : '' } onClick={() =>{ hideInfos()}}>
           </button>
        )}

        {hide === true &&(
          <button className={styles.showInfos} onClick={() =>{showInfos()}}>
          </button>
        )}
       
      </div>
      {hide === false &&(
          <InfosCar/>
      )
      }
    
     </div>
      
     
    </div> 
       
    )
}

export default Garagem;