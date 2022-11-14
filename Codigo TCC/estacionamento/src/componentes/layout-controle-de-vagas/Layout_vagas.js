import styles from "./layout_vagas.css"
import Vaga_okay from "../assets/icon-vaga-okay.png"
import Vaga_indis from "../assets/icon-vaga-indis.png"
import Vaga_reserved from "../assets/icon-vaga-reserved.png"

function Layout_vagas(){
    return(
        <div className="bodyControl">
            <div className="bodyDisponiveis">         
               <img className="iconParkingSize" src={Vaga_okay} ></img>
               <div className="countVagas">
              <p id="textVagas">Vagas Disponíveis:</p>
              <div className="bodyCount">
                <span>[value]</span>
                <div className="bodyCountButtons">
                    <button id="BtnMais" className = "countButtons"></button> 
                    <button id="BtnMenos" className = "countButtons"></button>
                </div>
                
              </div>
                </div>
            </div>
            

            <div className="bodyDisponiveis">         
               <img className="iconParkingSize" src={Vaga_reserved} ></img>
               <div className="countVagas">
              <p id="textVagas">Vagas Reservadas:</p>
              <div className="bodyCount">
                <span>[value]</span>
                <div className="bodyCountButtons">
                    <button id="BtnMais" className = "countButtons"></button> 
                    <button id="BtnMenos" className = "countButtons"></button>
                </div>
                
              </div>
                </div>
            </div>

            <div className="bodyDisponiveis">         
               <img className="iconParkingSize" src={Vaga_indis} ></img>
               <div className="countVagas">
              <p id="textVagas">Vagas Indisponíveis:</p>
              <div className="bodyCount">
                <span>[value]</span>              
              </div>
                </div>
            </div>
        </div>

    )
 }

 export default Layout_vagas;