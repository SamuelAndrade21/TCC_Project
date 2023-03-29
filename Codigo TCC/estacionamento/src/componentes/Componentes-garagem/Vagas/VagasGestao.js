import styles from './vagas.module.css'
import Button from '../Button';
import { useState,useEffect } from 'react';
import { BsArrowCounterclockwise } from "react-icons/bs";


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

                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>

                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>
                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>
                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>
                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>
                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>
                    <ul className = {styles.ListClient}>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                        <li>Teste</li>
                    </ul>
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
        </main>

       </> 
     
        
)}

export default Vagas;