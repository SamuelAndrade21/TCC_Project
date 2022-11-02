import styles from '../css_pages/Garagem.module.css';
import Vagas from '../Componentes-garagem/Page_vagas-geais/vagas_gestao';
import InfosCar from '../info-side/InfosCar';
function Garagem(){
    
  
    return(
     <div>
     <div className= {styles.bodyGarage}>
       <div id ={styles.bodyOffice}><p>Office</p></div>
      <Vagas/>
    </div>
    <div>
     <InfosCar/>
     </div>
    </div>   
    )
}

export default Garagem;