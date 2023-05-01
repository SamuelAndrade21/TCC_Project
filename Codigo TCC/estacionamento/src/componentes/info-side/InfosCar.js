import  styles from  './stylesInfos/infos.module.css'
import Caixa from './infoCaixa';
import { useEffect, useState,useRef } from 'react';
import { api } from '../apiClient.mjs';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';


function InfosCar(){

    useEffect( function(){
        try
        {   

            async function responseData(){
                const response = (api).get('/estacionamento/clientes-mensalistas')
                const arrayResponse = Object.values((await response).data)
                setListClients(arrayResponse)
            }

            responseData()
           
        }
        catch(err)
        {
            console.log(err)
            return
        }

    },[])

const [ listClients,setListClients ] = useState([])
const [chek,setChek] = useState(false)
const [ data, setData ] = useState('')

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');


const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');


const dateString = `${day}/${month}/${year}`;

const timeString = `${hours}:${minutes}:${seconds}`;

const dateTimeString = `${dateString} ${timeString}`;


//PEGANDO CLIENTES TEMPORÁRIOS
const [nomeTemp,setNomeTemp] = useState('')
const [veiculoTemp,setVeiculoTemp] = useState('')
const [placaTemp,setPlacaTemp] = useState('')

//DECODIFICANDO O TOKEN E RETORNANDO O ID
const token =  localStorage.getItem("token")
const base64Url = token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
const id_funcionario = decoded.user[0].funcionario_id
const caixa = localStorage.getItem("caixa")
const situacao = 'A'
const id_caixa = caixa



//PEGANDO OS CLIENTES MENSAIS
const [ values,setValues ] = useState([])
const valuesArray = []
const myList = values.innerText
valuesArray.push(myList?.split('\n'))
const id_cliente =  valuesArray[0]?.[0] 
const nameCLiente =  valuesArray[0]?.[1]

async function handleClientUser(e){
    e.preventDefault()
    
 


    try
    {
        
        const responseVenda = (api).post('/estacionamento/vendas-cadastro',
        {
            id_funcionario,
            id_cliente,
            id_caixa,
            situacao
        })

        if((await responseVenda).status === undefined){
            toast.error("Erro ao adicionar")
            return;

        } 

        else{
            toast.success(`Cliente ${nameCLiente} adicionado a lista`,{
                autoClose:1400
            })
        }
          
    }
    catch
    (err){
        console.log(err)
        toast.error("Erro ao adicionar")
        return
    }
           
}


 async function handleTempoUser(e){
    e.preventDefault()
    
    if(nomeTemp === '' || veiculoTemp === '' || placaTemp === ''){
        toast.warn("Preencha os campos obrigatórios")
        return
    }
    console.log(nomeTemp)

    try{
        const response = (await api).post('/cliente/temporario/cadastro',{
            nomeTemp,
            veiculoTemp,
            placaTemp
        }
        
        )
        if((await response).status === undefined){
            toast.error("Erro ao adicionar")
            return;
        }
    
        else{
            toast.success("Cliente adicionado a Lista",{
                autoClose:1400
            })

        }
      
        const id_cliente = (await response).data.nomeTemp.insertId
     

        const reponseVenda = (await api).post('/estacionamento/vendas-cadastro',
        {
            id_funcionario,
            id_cliente,
            id_caixa,
            situacao
        })
     

    }
    catch(error){
        toast.error("Erro ao adicionar ",{
            autoClose:2000
        })
        console.log(error)
    }

 }




    return(
        <div className = {styles.bodyInfo}>

            <label
            htmlFor='checkboxInput'
            className={styles.roundSliderContainer}>
            <input type={"checkbox"} id = 'checkboxInput' onChange={(e) =>{setChek(e.target.checked)}} className={styles.InputChange}/>
            <div>Temporario</div>
            <div>Cliente Mensal</div>
            <div className={styles.roundSlider}></div>
            </label>

            {chek === true &&(
                <form className={styles.FormTemp}  
                onSubmit={(e) => { handleTempoUser(e)}} >
                <span className={styles.required}>Campos obrigatórios *</span>
                    <h2>Dados do Temporário</h2>
                <div className={styles.bodyLabel}>
                    
                <label id='name'>Nome:<span className={styles.required}>*</span></label>
                <input
                onChange={(e) =>{setNomeTemp(e.target.value)}}
                type={'text'} className={styles.input}/>
                </div>
               
                <div className={styles.bodyLabel}>
                <label id='veiculo'>Veículo:<span className={styles.required}>*</span></label>
                <input 
                onChange={(e)=>{setVeiculoTemp(e.target.value)}}
                type={'text'}
                className={styles.input}/> 
                </div>
    
                
                <div className={styles.bodyLabel}>
                <label id='placa'>Placa:<span className={styles.required}>*</span></label>
                <input
                onChange={(e) =>{setPlacaTemp(e.target.value)}}
                type={'text'}
                className={styles.input}/> 
                </div>

                <button
                type='submit'
                className={styles.btnSubmit}
                onClick={() =>{setData(dateTimeString)}}>
                    Adicionar
                </button>
            
               </form>
            )}
           
           {chek === false &&(
           
            
            <form className={styles.FormTemp} >
            <h2>Clentes Mensalistas</h2>
                 <div className={styles.sliderDiv} >
                    {listClients.map((clientes) =>
                    (
                        <div key={clientes.cliente_id} onClick={(e) =>{setValues(e.target);setData(dateTimeString)}} onDoubleClick={(e) =>{handleClientUser(e)}}   className={styles.containerLista}>
                            <ul className={styles.listMensalistas}>
                                <li>{clientes.cliente_id}</li>
                                <li>{clientes.nome}</li>
                                <li>{clientes.celular}</li>
                                <li>{clientes.veiculo}</li>
                                <li>{clientes.placa}</li>
                            </ul>  
                        </div>
                    ))}
                         
                 </div>
                    
           </form>
          
           )
           }
       
       <Caixa
       cliente={nameCLiente || nomeTemp}
       Data={data}
       />
        
        </div>
    )
}

export default InfosCar;