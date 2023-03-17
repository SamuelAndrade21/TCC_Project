import styles from '../css_pages/Garagem.module.css';
import Vagas from '../Componentes-garagem/Page_vagas-geais/vagas_gestao';
import InfosCar from '../info-side/InfosCar';
import Navbar from '../layout/Navbar';
function Garagem(){
    
  
    return(
     <div>
      <Navbar/>
     {/* <div className= {styles.bodyGarage}>
       <div id ={styles.bodyOffice}><p>Office</p></div>
      <Vagas/>
      
    </div>
    <div>
     <InfosCar/>
     </div> */}
    </div>   
    )
}

export default Garagem;