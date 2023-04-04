import styles from './vagas.module.css'
import Button from '../Button';
import { useState,useEffect } from 'react';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { VagasControll } from './elements/Vagas-Controll/VagasControll';


function Vagas(){


    return(
        <> 
        <main className={styles.container}>
            <div className={styles.conatinerButton}>
            <button className={styles.btnVendas}><BsArrowCounterclockwise/></button><p>Listar vendas</p>
            </div>
            <div className={styles.ListContainer}>
            <ul className={styles.headerList}>
                       <li>Cod.</li>
                       <li>Entrada</li> 
                       <li>Cliente</li>
                       <li>Placa</li>
                       <li>Veículo</li>
                       <li>Valor</li>
                    </ul>
                <article> 
                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>                
                </article>
            </div>

            <div className = {styles.Buttons}>
                    <button style = {{background:"#27AE60", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"150px",fontSize:"1rem"}}>
                        Adicionar Venda
                    </button>
                    <button style = {{background:"#D7BC2F", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"150px",fontSize:"1rem"}}>
                        Receber Venda
                    </button>
                    <button style = {{background:"#F0780A", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"170px",fontSize:"1rem"}} >
                        Reimprimir Ticket
                    </button>
                    <button style = {{background:"#E23535", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"150px",fontSize:"1rem"}} >
                        Cancelar Venda
                    </button>
                </div>

                <VagasControll/>
        </main>

       </> 
     
        
)}

export default Vagas;