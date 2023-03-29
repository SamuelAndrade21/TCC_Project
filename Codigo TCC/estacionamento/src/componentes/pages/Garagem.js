import styles from '../css_pages/Garagem.module.css';
import Vagas from '../Componentes-garagem/Vagas/VagasGestao.js';
import InfosCar from '../info-side/InfosCar';
import Navbar from '../layout/Navbar';
function Garagem(){
    
  
    return(  
    <div className = {styles.bodyGarage}>
     <Navbar/>
     <Vagas/>
      <InfosCar/>
    </div> 
       
    )
}

export default Garagem;