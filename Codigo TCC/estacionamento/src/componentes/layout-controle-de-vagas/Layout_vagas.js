import styles from "./layout_vagas.css"
import Vaga_okay from "../assets/icon-vaga-okay.png"

function Layout_vagas(){
    return(
        <div className="bodyControl">
            <div className="bodyDisponiveis">
                
               <img className="iconParkingSize" src={Vaga_okay} ></img>
              <p> </p>
               
            </div>
        </div>

    )
 }

 export default Layout_vagas;