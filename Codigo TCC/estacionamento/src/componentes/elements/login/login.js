import React, { useState } from "react";
import {toast} from 'react-toastify'
import Input from "../../elements/inputs/Input";
import styles from './login.module.css' 
import { HiIdentification,HiLockClosed } from "react-icons/hi";
import Button from "../buttons/Button.js";
import Link from "../links/Links.js";
import Logo from '../../assets/LogoPrincipal.png'
import { useNavigate } from 'react-router-dom'
import { api } from "../../apiClient.mjs";


function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [ senha,setSenha ] = useState('')

    async function singIn(e){
        e.preventDefault() 
        
        if(email === '' || senha === ''){
            toast.warning('Preencha os campos!',{
              autoClose:2000
            })
            return;
          } 

                try{

                const response =  (await api).post('/login',{
                    email,
                    senha      
                })

                if((await response).status === undefined){
                    toast.error("Email/Senha inválido!")
                    navigate('/')
                }

                else{
                    toast.success('Logado com Sucesso!',{
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

            }
            
            catch(err){
               
                toast.error('Erro ao logar',{
                    autoClose:2000
                })
                console.log(err)
            }
          

}

    

    return(
        <div className={styles.bodyLogin}>
           
           
            <form className={styles.form} onSubmit={singIn}>
                 <h1 className={styles.title}>Área do funcionário</h1> 
                <Input 
                handleChange={ (e) =>{setEmail(e.target.value)}}
                value={email}
                type={'text'}  
                icon={<HiIdentification/>} 
                placeholder={'Email'}>
                </Input>

                <Input 
                handleChange={(e) =>{setSenha(e.target.value)}}
                value={senha}
                type={'password'}
                icon ={<HiLockClosed/>}
                placeholder = {'Senha'}>
                </Input>
                <p className={styles.cadastrar}>Não possuí login?<span><Link href={'/cadastrar'} text={'Cadastre-se'}></Link></span></p>

                <Button  type={'submit'} text ={'Entrar'}></Button>

            </form>
            <img src={Logo} className={styles.logo} alt = 'logo'></img>
        </div>
    )

}

export default Login