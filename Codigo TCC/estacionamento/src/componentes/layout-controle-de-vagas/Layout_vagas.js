import styles from "./layout_vagas.css"
import {useRef, useEffect, useState} from 'react';
import Vaga_indis from "../assets/icon-vaga-indis.png"
import Vagas from "../Componentes-garagem/Page_vagas-geais/vagas_gestao";
import Vaga_reserved from "../assets/icon-vaga-reserved.png"

function Layout_vagas({changeVagasLess,changeVagasMore}){
  
  //Adicionar lógica que captura o botão
  //Function que executa a desativação da div
  //capturar o elemento que vai ser desativado
  //Adicionar JSX na página que vai ser executada
  //Apartir do momento em que tal evento é disparado(dependendo do button se é positivo ou negativo),
  // ele vai executar tal função que vai acrescentar ao banco de dados ou remover("PUT","DELETE")
  //Os values dos buttons vão ser todos capturados via fetch com GET
  //Vai ter as vagas disponíveis e indisponíveis
  // useEffect(() =>{
  //   fetch('http://localhost:5000/carros',{
  //     method:
  //   })
  // })
  


    return(
        <div className="bodyControl" >
            <div className="bodyIndisponiveis">         
               <img className="iconParkingSize" src={Vaga_indis} ></img>
               <div className="countVagas">
              <p className="textVagas">Vagas Indisponíveis:</p>
              <div className="bodyCount">
                <span>[value]</span>
                <div className="bodyCountButtons">
                    <button onClick={changeVagasMore} className = "countButtons BtnMais "></button> 
                    <button onClick = {changeVagasLess} className = "countButtons BtnMenos"></button>
                </div>
                
              </div>
                </div>
            </div>
            

            <div className="bodyDisponiveis">         
               <img className="iconParkingSize" src={Vaga_reserved} ></img>
               <div className="countVagas">
              <p className="textVagas">Vagas Reservadas:</p>
              <div className="bodyCount">
                <span>[value]</span>
                <div className="bodyCountButtons">
                    <button className = "countButtons BtnMais "></button> 
                    <button className = "countButtons BtnMenos"></button>
                </div>
                
              </div>
                </div>
            </div>
        </div>

    )
 }

 export default Layout_vagas;
 