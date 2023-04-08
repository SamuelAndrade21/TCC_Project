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
    const [ veiculo,setVeiculo ] = useState('')
    const [ placa,setPlaca ] = useState('')
    const [ modelo,setModelo ] = useState('')
    const [ ano,setAno ] = useState('')
    const [ valorMensalidade,setValorMensalidade ] = useState('')

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
                 <h1 className={styles.title}>Área do Cliente</h1> 
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

                <Input 
                handleChange={(e) =>{setVeiculo(e.target.value)}}
                value={veiculo}
                type={'text'}
                icon ={<HiLockClosed/>}
                placeholder = {'Veículo'}>
                </Input> 

                <Input 
                handleChange={(e) =>{setPlaca(e.target.value)}}
                value={placa}
                type={'text'}
                icon ={<HiLockClosed/>}
                placeholder = {'Placa'}>
                </Input> 

                <Input 
                handleChange={(e) =>{setModelo(e.target.value)}}
                value={modelo}
                type={'text'}
                icon ={<HiLockClosed/>}
                placeholder = {'Modelo'}>
                </Input> 

                <Input 
                handleChange={(e) =>{setAno(e.target.value)}}
                value={ano}
                type={'text'}
                icon ={<HiLockClosed/>}
                placeholder = {'Ano'}>
                </Input> 

                <Input 
                handleChange={(e) =>{setValorMensalidade(e.target.value)}}
                value={valorMensalidade}
                type={'valorMensalidade'}
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