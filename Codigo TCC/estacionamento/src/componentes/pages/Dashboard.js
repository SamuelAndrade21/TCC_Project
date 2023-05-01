import styles from '../css_pages/PaginaInicial.module.css'
import Navbar from '../layout/Navbar';
import { Buffer } from 'buffer';
import { useEffect,useState,useRef } from 'react';
import { api } from '../apiClient.mjs';
import { TbLockOpen,TbLockOpenOff } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import { toast } from 'react-toastify';

function Dashboard(){  
    useEffect(() =>{
        async function execute(){
            const response = (api).get('caixa/lista-caixas')
            const arrayResponse = Object.values((await response).data)
            setCaixas(arrayResponse)
            console.log(caixas)
        }

        execute()


    },[])

    const [ modalCaixa,setModalCaixa ] = useState(false)
    const [ caixas, setCaixas ] = useState([])
    const [ valuesCaixa, setValuesCaixa ] = useState([])
    const [ valueGaveta, setValueGaveta ] = useState('')


    async function executeModal(caixa_id,valor_gaveta,data_fechamento){
        setModalCaixa(true)
        setValuesCaixa([caixa_id,valor_gaveta,data_fechamento])
        console.log(valuesCaixa)
    }

    async function OpenCaixa(){
        const caixa_id_cookie = localStorage?.getItem("caixa")
        

        if (localStorage.getItem('caixa') !== null) {
            toast.warning(`O caixa ${caixa_id_cookie} está em aberto!`);
            return;
          } 

        const caixa_id = valuesCaixa[0]
        const valor_gaveta = valueGaveta


            const response = (api).put('/caixa/abrir-caixa',{
                caixa_id,
                valor_gaveta
            })

            if((await response).data === undefined){
                toast.error("Erro ao abrir caixa!")
                return
            }

        localStorage.setItem("caixa",caixa_id)
        const responseAPI = (api).get('caixa/lista-caixas')
        const arrayResponse = Object.values((await responseAPI).data)
        setCaixas(arrayResponse)

        toast.success("Caixa aberto com Sucesso!")

        setModalCaixa(false)

    }

    async function closeCaixa(caixa){
        const caixa_id = localStorage.getItem("caixa")

        if(caixa !== caixa_id){
            console.log(caixa == caixa_id)
            toast.warning(`Caixa em aberto é ${caixa_id}`)
        }
        if(caixa == caixa_id)
        {

            if(caixa_id){

                try
                {
                    const response = (api).put('/caixa/fechar-caixa',{
                        caixa_id
                    })

                    if((await response).data === undefined){
                        toast.error("Erro ao fechar caixa!")
                        return
                    }

                    localStorage.removeItem("caixa")
                    const responseAPI = (api).get('caixa/lista-caixas')
                    const arrayResponse = Object.values((await responseAPI).data)
                    setCaixas(arrayResponse)
                    toast.success(`Caixa ${caixa_id} fechado!`)
                }
                catch(err){
                    console.log(err)
                    toast.error("Erro ao fechar o caixa!")
                }
            
            }

            if(!caixa_id){
                toast.warning(`O Caixa em aberto é ${caixa_id}`)
                return
            }
        }
    }

    async function novoCaixa(e){
        e.preventDefault()
        try
        {
                const response = (api).post('/caixa/criar-caixa')

                if((await response).data === undefined){
                    toast.error("Erro ao criar novo caixa!")
                    return
                }

                const responseAPI = (api).get('caixa/lista-caixas')
                const arrayResponse = Object.values((await responseAPI).data)
                setCaixas(arrayResponse)

                // caixas.push((await response).data)
                toast.success(`Novo caixa criado!`)
        }
        catch(err){
            console.log(err)
            toast.error("Erro ao fechar o caixa!")
        }
    }
    
    
    //DECODIFICANDO O TOKEN E RETORNANDO O ID
    const token =  localStorage.getItem("token")
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
    const id_funcionario = decoded.user[0].nome

  

    return(
        
       <div>
        
        <div className={styles.container}>
                <Navbar/>
                    <div className={styles.bodyDashboard}>
                        <h3>Funcionário:<span>{id_funcionario}</span></h3>                      
                    
                    <h1>Caixas:</h1>
                    <div className={styles.bodyCaixas}>
                        
                            {
                              caixas.map((data) =>(
                              
                                    <div key={data.caixa_id} className={styles.caixa}>
                                        <div className={styles.btnCaixa}>
                                            <p>Caixa:{data.caixa_id}</p>
                                                <div className={styles.editCaixa}>
                                                    <button onClick={() =>{executeModal(data.caixa_id,data.valor_gaveta,data.data_fechamento)}}><span className={styles.spanIconOpen}><TbLockOpen/></span></button>
                                                    <button onClick={() =>{closeCaixa(data.caixa_id)}}><span className={styles.spanIconClose}><TbLockOpenOff/></span></button>
                                                </div>
                                        </div>
                                    </div>      
                                
                              ))
                                     
                            }
                            {modalCaixa === true &&(
                                <div className={styles.ModalCaixa}>
                                    <button className={styles.btnCloseModal} onClick={() =>{setModalCaixa(false)}}><FiX/></button>
                                    <h2>Ultimo fechamento:</h2>
                                    <input readOnly className={styles.dataInput} defaultValue={valuesCaixa[2]}></input>
                                    <div className={styles.infoValues}><h4>Valor em Gaveta:</h4><h4>Caixa:</h4></div>
                                    <div className={styles.values}><label className={styles.labelGaveta}>R$</label><input onChange={(e) =>{setValueGaveta(e.target.value)}}  defaultValue={valuesCaixa[1]} className={styles.gaveta}/><input readOnly defaultValue={valuesCaixa[0]} className={styles.caixaID}/></div>
                                    <button onClick={() => {OpenCaixa()}} className={styles.btnAbrirCaixa}>Abrir Caixa</button>
                                   
                                </div>
                            )

                            }

                            <div className={styles.caixa}>
                                <button onClick={(e) =>{novoCaixa(e)}} className={styles.btnAddict}>+</button>
                            </div>
                    </div>
            </div> 
        </div>

       </div>

    )
}

export default Dashboard;