import Navbar from "../layout/Navbar"
import { useState,useEffect,useRef } from "react"
import styles from '../css_pages/configuracoes.module.css'
import { FiEdit } from "react-icons/fi";
import { api } from '../apiClient.mjs'
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'


 function Configuracoes(){
   const navigate = useNavigate()
    const token =  localStorage.getItem("token")
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
    const funcionario_id = decoded.user[0].funcionario_id

    useEffect(() =>{
        async function responseData(){      
            const response = await (api).get('estacionamento/pagamentos/todos')
            const arrayValues = Object.values((response).data)
            setValue(arrayValues)

            const resposenFuncionario =  await (api).post('funcionario/lista-funcionarios',{
                funcionario_id
           })
           const arrayResponseFuncionario = Object.values(await(resposenFuncionario).data)
           setFuncionarioInfo(arrayResponseFuncionario)
        }
        responseData()
        
        setTicketStorage([localStorage.getItem("ticket")])
        setEnderecoStorage([localStorage.getItem("endereco")])
        setMensalidadeStorage([localStorage.getItem("mensalidade")])
  

    },[])

    const [ values, setValue ] = useState([])
    const [ funcionarioInfo, setFuncionarioInfo ] = useState([])
    const funcionario = funcionarioInfo[0]

   async function changeCheckedValue(situacao,id){
    const tipo_pag_id = id

        if(situacao === 'V'){
            
            const response = await (api).post('/estacionamento/pagamento/set-f',{
                tipo_pag_id
            })
             const responseAll = await (api).get('estacionamento/pagamentos/todos')
            const arrayResponse = Object.values((responseAll).data)
            setValue(arrayResponse)
            
            
        }   
       

        if(situacao === 'F'){
          
            const response = await (api).post('/estacionamento/pagamento/set-v',{
                tipo_pag_id
            })
            const responseAll = await (api).get('estacionamento/pagamentos/todos')
            const arrayResponse = Object.values((responseAll).data)
            setValue(arrayResponse)
                            
        }      
      
    }

       const displayBtn = useRef(null)
       const displayBtnSenha = useRef(null) 
       const refEmail = useRef(null)
       const refEndereco = useRef(null)
       const refMensalidade = useRef(null)
       const refNome = useRef(null)
       const refTelTicket = useRef(null)
       const refTelefone = useRef(null)

       const [ hideSenha,setHedSenha ] = useState(false)
       const [ novaSenha,setNovaSenha ] = useState("")
       const [ confirmaDados,setConfirmaDados ] = useState(false)
      
       let [nome, setNome] = useState("")
       let [email, setEmail] = useState("")
       const [ticketStorage, setTicketStorage] = useState([])
       const [enderecoStorage, setEnderecoStorage] = useState([])
       const [mensalidadeStorage, setMensalidadeStorage] = useState([])
       let [telefone, setTelefone] = useState("")
       const [telefoneTicket, setTelefoneTicket] = useState("")
       const [endereco, setEndereco] = useState("")
       const [mensalidade, setMensalidade] = useState("")
       const [senha, setSenha] = useState("")
       const [confirmarSenha, setConfirmarSenha] = useState("")

         

        function alterSenha(e){
            e.preventDefault()
            setHedSenha(true)
            displayBtnSenha.current.style.display = 'none'
            displayBtn.current.style.display = 'none'
        
        }

        async function enviaNovaSenha(e){
            e.preventDefault()
        
            const senha = novaSenha
            const funcionario_id = decoded.user[0].funcionario_id
            try
            {
                const response = await (api).put('/funcionario/atualizar/senha',{
                    funcionario_id,
                    senha
                })


                toast.success("Senha atualizado com sucesso")
                displayBtn.current.style.display = 'flex'
                displayBtnSenha.current.style.display = 'flex'
                setHedSenha(false)
            
            
            }
            catch(err){
                console.log(err)
            }

        }

        function alteraDados(e){
            e.preventDefault()
            refNome.current.readOnly = false
            refEmail.current.readOnly = false
            refEndereco.current.readOnly = false
            refTelTicket.current.readOnly = false
            refTelefone.current.readOnly = false
            refMensalidade.current.readOnly = false
            displayBtnSenha.current.style.display = 'none'
            displayBtn.current.style.display = 'none'
            setConfirmaDados(true)
        }

        async function enviaNovosDados(e){
            e.preventDefault()
                            
            localStorage.setItem("endereco",endereco)
            localStorage.setItem("ticket",telefoneTicket)
            localStorage.setItem("mensalidade",mensalidade)

        
            if(nome === ''){
            console.log(nome)
            nome = refNome?.current?.value
            }

            if(email === ''){
                email = refEmail.current.value
            }

            if(telefone === ''){
                telefone = refTelefone.current.value
            }

            try
            {
                const response = await (api).put('/funcionario/atualizar/dados',{
                    funcionario_id,
                    nome,
                    email,
                    telefone
                })

                refNome.current.readOnly = true
                refEmail.current.readOnly = true
                refEndereco.current.readOnly = true
                refTelTicket.current.readOnly = true
                refTelefone.current.readOnly = true
                refMensalidade.current.readOnly = true
                displayBtnSenha.current.style.display = 'flex'
                displayBtn.current.style.display = 'flex'
                setConfirmaDados(false)
                localStorage.removeItem("token")
                navigate('/')
                
            }catch(err){
                console.log(err)
            }

        }

        console.log(enderecoStorage[0])
        
    
        
    

    return(
        <div className={styles.container}>
            <Navbar/>
            
            <div className={styles.bodyConfiguracoes}>
                <h1>Configurações</h1>
                <h3>Informações do funcionário</h3>
                <div>
                         {funcionario &&(
                             <form className={styles.formBody}>
                        
                             <div className={styles.inputInfo}>
                                 <label htmlFor="nome">Nome:</label>
                                 <input ref={refNome} onChange={(e) =>{setNome(e.target.value || funcionario[0]?.nome)}} defaultValue={funcionario[0]?.nome} readOnly id="nome" type="text" name="nome"/>
                             </div>
                            
                             <div className={styles.inputInfo}>
                                 <label htmlFor="email">Email:</label>
                                 <input ref={refEmail} onChange={(e) =>{setEmail(e.target.value || funcionario[0]?.email)}} defaultValue={funcionario[0]?.email} readOnly id="email" type="email" name="email"/>
                             </div>
                             
     
                             <div className={styles.inputInfo}>
                                 <label htmlFor="telefone">Telefone:</label>
                                 <input ref={refTelefone} onChange={(e) =>{setTelefone(e.target.value || funcionario[0]?.telefone)}} defaultValue={funcionario[0]?.telefone} readOnly id="telefone" type="text" name="telefone"/>
                             </div>
                           
     
                             <div className={styles.inputInfo}>
                                 <label htmlFor="telefone-ticket">Telefone do ticket:</label>
                                 <input defaultValue = {ticketStorage[0]}  ref={refTelTicket} onChange={(e) =>{setTelefoneTicket("" ? ticketStorage[0] : e.target.value)}} readOnly id="telefone-ticket" type="text" name="telefone-ticket"/>
                             </div>
                             
     
                             <div className={styles.inputInfo}>
                                 <label htmlFor="endereco">Endereço:</label>
                                 <input defaultValue={enderecoStorage[0]}  ref={refEndereco} onChange={(e) =>{setEndereco(e.target.value)}} readOnly id="endereco" type="text" name="endereco"/>
                             </div>

                             <div className={styles.inputInfo}>
                                 <label htmlFor="mensalidade">Mensalidade padrão:</label>
                                 <input defaultValue={mensalidadeStorage[0]}  ref={refMensalidade} onChange={(e) =>{setMensalidade(e.target.value)}} readOnly id="mensalidade" type="text" name="endereco"/>
                             </div>
                            
     
                             <div className={styles.buttonsContainer}>
                                 <button onClick={(e)=>{alteraDados(e)}} ref={displayBtn} className={styles.btnDados}>
                                 Alterar dados
                                 <FiEdit/>
                                 </button>
                                 {hideSenha &&(
                                    <>
                                 <div className={styles.newSenhaInput}>
                                     <label htmlFor="senha">Nova senha:</label>
                                     <input onChange={(e) =>{setNovaSenha(e.target.value)}} required id="senha" type="text" name="senha"/>
                                 </div>

                                 <button onClick={(e) =>{enviaNovaSenha(e)}} className={styles.btnConfirm}>
                                    Confirmar
                                 </button>
                                    </>
                                 
                                 )

                                 }

                                {confirmaDados &&(
                                    <>
                                 <button onClick={(e) =>{enviaNovosDados(e)}} className={styles.btnConfirm}>
                                    Confirmar
                                 </button>
                                    </>
                                 
                                 )

                                 }
     
                                 <button ref={displayBtnSenha} onClick={(e) =>{alterSenha(e)}} className={styles.btnSenha}>
                                 Alterar senha
                                 <FiEdit/>
                                 </button>
                             </div>
                         </form>
                          )}
                   
                    <h3>Formas de Pagamento:</h3>
                        <div className={styles.formasPagamento}>
                           
                            {
                                    values.map((data)=>(
                                  <div key={data.tipo_pag_id} className={styles.pagamentos}>

                                        <div>
                                            {data.nome_pagamento}
                                        </div>
                                        <div className={styles.changeState}>
                                            <label
                                            htmlFor={data.nome_pamento}
                                            className={styles.roundSliderContainer}>
                                            <input onClick ={() =>{changeCheckedValue(data.situacao,data.tipo_pag_id)}} type={"checkbox"} defaultChecked={data.situacao === 'V' ? true:false} id = {data.nome_pamento}  className={styles.InputChange}/>
                                            <div className={styles.roundSlider}></div>
                                            </label>
                                        </div>
                                    </div>
                                    ))
                                 }
                            
                        </div>
                </div>
            </div>

        </div>
    )
  
}

export default Configuracoes