import Input from '../inputs/Input'
import styles from './cadastro.module.css'
import { FiUser,FiMail,FiUnlock,FiPhone } from "react-icons/fi";
import { api } from '../../apiClient.mjs';
import React, { useState } from "react";
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'



export default function Cadastrar(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [ senha,setSenha ] = useState('')
    const [ nome,setNome ] = useState('')
    const [ telefone,setTelefone ] = useState('')


    async function signUp(e){
        e.preventDefault() 
        
        if(email === '' || senha === '' || telefone === '' ||nome === ''){
            toast.warning('Preencha os campos!',{
              autoClose:2000
            })
            return;
          } 

                try{

                const response = (await api).post('/registrar',{
                    nome,
                    telefone,
                    email,
                    senha
                })

                if((await response).status === 400){
                    toast.error("Usuário já cadastrado",{
                        autoClose:2000
                    })
                
                    navigate('/')
                }

            
                toast.success('Cadastrado com sucesso!',{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })    

                navigate('/Garagem')   
                }     
     
            catch(err){
               
                toast.error('Erro ao cadastrar!',{
                    autoClose:2000
                })
                console.log(err)
            }
          

}
    return(
        <>
        <main>
            <div className={styles.bodyCadastro}>
                <h1>Cadastro de Funcionário</h1>
                <hr/>
                <form className={styles.bodyForm}>
                    <div className={styles.bodyInputs}>

                    <Input
                    value={nome}
                    handleChange={(e) =>{setNome(e.target.value)}}
                    type={'text'}
                    placeholder={'Digite seu nome completo'}
                    icon = {<FiUser/>}
                    />

                    <Input
                    value={email}
                    handleChange={(e) =>{setEmail(e.target.value)}}
                    type={'text'}
                    placeholder={'Digite seu email'}
                    icon = {<FiMail/>}
                    />

                    </div>
                    

        <div className={styles.bodyPermissions}>
                  
                    <Input
                    value={senha}
                    handleChange={(e) =>{setSenha(e.target.value)}}
                    type={'password'}
                    placeholder={'Digite sua senha'}
                    icon = {<FiUnlock/>}
                    />  
                    
                     <Input
                    value={telefone}
                    handleChange={(e) =>{setTelefone(e.target.value)}}
                    type={'text'}
                    placeholder={'Digite seu telefone'}
                    icon = {<FiPhone/>}
                    />
                    <button onClick={signUp} className={styles.Button}>
                        Cadastrar
                    </button> 

            </div>
                    

                </form>
            </div>
        </main>
        </>
    )
}