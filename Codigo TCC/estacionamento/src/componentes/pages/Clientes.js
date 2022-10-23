import React from "react"; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from '../css_pages/clientes.module.css';

function Clientes(){
    return (
        <div>
            <div className={styles.title}>
                <h1>Cadastro de funcionário</h1>
            </div> 
            <div className={styles.inputs}>
                <form>
                    <input type="text" name = "Nome" required/>
                    <input type="email" name="E-mail" required/> 
                    <input type="number" name="RG"/> 
                    <input type="tel" name="Telefone"/> 
                    <input type="date" name="Data de nascimento"/> 
                    <input type="password" name="Senha"/> 
                </form>
                <div className={styles.permissions}>
                    <h1>Permissões do funcionário</h1>
                </div>
            </div>
        </div>
    )
    
}

export default Clientes;