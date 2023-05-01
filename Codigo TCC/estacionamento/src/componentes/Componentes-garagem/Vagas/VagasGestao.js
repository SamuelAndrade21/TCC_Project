import styles from './vagas.module.css'
import { useState,useEffect, useRef } from 'react';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { VagasControll } from './elements/Vagas-Controll/VagasControll';
import { api } from '../../apiClient.mjs';
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi'




function Vagas(){
  
    const [ vendas,setVendas ] = useState([])
    const [ index, setIndex ] = useState('')
    const [ pagamentos,setPagamentos ] = useState([])
    const [ tipo, setTipo ] = useState(null)
    const [ valor,setValor ] = useState('')
    const [ troco,setTroco ] = useState('')

    const color1 = useRef(null)
    const color2 = useRef(null)
    const color3 = useRef(null)
    const color4 = useRef(null)

    const [modalVisible, setModalVisible] = useState(false)
    const teste = useRef(null)
    const [ values,setValues ] = useState([])
    const valuesArray = []
    const myList = values.innerText
    valuesArray.push(myList?.split('\n'))
    const venda_cabecalho_id =  valuesArray[0]?.[0] 
    const date = valuesArray[0]?.[1]
    const name_cliente = valuesArray[0]?.[2]

   

 

    useEffect(() =>{
        async function responseData(){
            const response = (api).get('estacionamento/pagamentos')
            const arrayResponse = Object.values((await response).data)
            setPagamentos(arrayResponse)
    
        }
        responseData()
        

    },[])

   const pix = pagamentos[0]
   const dinheiro = pagamentos[1]
   const debito = pagamentos[2]
   const credito = pagamentos[3] 

    async function handlePayments(){
        setModalVisible(true)
    }

    const Print = (e) =>{   
        e.preventDefault()
        document.getElementById('data').innerHTML += date  
        document.getElementById('cliente').innerHTML += name_cliente;
        let printContents = document.getElementById('printCaixa').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload() 

      }

    function closeModal(){
        setModalVisible(false)
    }

    async function stayClick(e){
      
        if(tipo === 1){
            color1.current.style.backgroundColor = '#27AE60'
        }

        else{
            color1.current.style.backgroundColor = 'transparent'
        }

        if(tipo === 2){
            color2.current.style.backgroundColor = '#27AE60'
        }

        else{
            color2.current.style.backgroundColor = 'transparent'
        }

        if(tipo === 3){
            color3.current.style.backgroundColor = '#27AE60'
        }

        else{
            color3.current.style.backgroundColor = 'transparent'
        }

        if(tipo === 4){
            color4.current.style.backgroundColor = '#27AE60'
        }

        else{
            color4.current.style.backgroundColor = 'transparent'
        }
       
        
    }

    async function cancelaVenda(e){
        e.preventDefault()
        try 
        {
            const response = (api).post('/estacionamento/cancela-venda',{
                venda_cabecalho_id
            })

            if((await response).data === undefined){
                toast.error("Erro ao cancelar a venda!")
            }

            toast.success("Venda Cancelada!")
        }
        catch(err)
        {
            toast.error("Erro ao cancelar")
            console.log(err)
            return
        }
    }

    async function finishPayment(e){
        e.preventDefault()
        try
        {
            const valor_venda = valor
            const valor_total = parseFloat(valor)
            let valor_recebido = parseFloat(valor_total) + parseFloat(troco)
            const id_tipo_pag = tipo
            console.log(valor_recebido)
            
            const response = (api).post('/estacionamento/finaliza-venda',{
                valor_venda,
                valor_total,
                valor_recebido,
                troco,
                id_tipo_pag,
                venda_cabecalho_id
            })

            setModalVisible(false)
            toast.success("Venda Finalizada!")
            

        }
        catch(err)
        {
            console.log(err)
            toast.error("Erro ao finalizar")
            return
        }


    }

    async function handleVendas(event){
        event.preventDefault()

        if(index === 'AllSales'){
            try
            {
                const response = api.get('/estacionamento/vendas')
                const vendasArray = Object.values((await response).data)
    
                if(!(await response).data){
                    throw new Error("Erro ao pegar as infos")
                }
                console.log(index)
    
                setVendas(vendasArray)
                toast.success("Lista atualizada!")
                console.log(vendas)
            }
            catch(err)
            {
                console.log(err)
            }
        }

        if(index === 'cancelSales'){
            try
            {
                const response = api.get('/estacionamento/vendas-canceladas')
                const vendasArray = Object.values((await response).data)
    
                if(!(await response).data){
                    throw new Error("Erro ao pegar as infos")
                }
                console.log(index)
    
                setVendas(vendasArray)
                toast.success("Lista atualizada!")
                console.log(vendas)
            }
            catch(err)
            {
                console.log(err)
            }
        }

        if(index === 'finalSales'){
            try
            {
                const response = api.get('/estacionamento/vendas-finalizadas')
                const vendasArray = Object.values((await response).data)
    
                if(!(await response).data){
                    throw new Error("Erro ao pegar as infos")
                }
                console.log(index)
    
                setVendas(vendasArray)
                toast.success("Lista atualizada!")
                console.log(vendas)
            }
            catch(err)
            {
                console.log(err)
            }
        }

        if(index === 'loadingSales'){
            try
            {
                const response = api.get('/estacionamento/vendas-aguardando')
                const vendasArray = Object.values((await response).data)
    
                if(!(await response).data){
                    throw new Error("Erro ao pegar as infos")
                }
                console.log(index)
    
                setVendas(vendasArray)
                toast.success("Lista atualizada!")
                console.log(vendas)
            }
            catch(err)
            {
                console.log(err)
            }
        }
       
    }


    return(
        <> 
        <main className={styles.container}>
            <div className={styles.conatinerButton}>
            <div className={styles.Listbtn}><button type='submit' onClick={(e) => handleVendas(e)} className={styles.btnVendas}><BsArrowCounterclockwise/></button><p>Listar vendas</p></div>
            <select className={styles.selectOptions} onChange={(e) =>{setIndex(e.target.value)}}>
                <option defaultChecked value='SelectOption'>Selecione uma opção</option>
                <option value='AllSales'>Todas as Vendas</option>
                <option value='loadingSales'>Vendas em Aguardo</option>
                <option value='cancelSales'>Vendas Canceladas</option>
                <option value='finalSales'>Vendas Finalizadas</option>
            </select>
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
                 {vendas.map((venda) => 
                     (
                    <ul onClick={(e) =>{setValues(e.target);toast.success("Venda Salva!");}} ref={teste} key={venda.venda_cabecalho_id} className = {styles.ListClient}>
                        <li>{venda.venda_cabecalho_id}</li>
                        <li>{venda.data_hora_venda}</li>
                        <li>{venda.nome}</li>
                        <li>{venda.placa}</li>
                        <li>{venda.veiculo}</li>
                        <li>R$ {venda.valor_recebido}</li>
                    </ul> 
                    )       
                 )     
                 }   
                   
                </article>
            </div>

            <div className = {styles.Buttons}>
                    <button onClick={() => {handlePayments()}} style = {{background:"#27AE60", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"150px",fontSize:"1rem"}}>
                        Receber Venda
                    </button>
                    <button onClick={(e) =>{Print(e)}}  style = {{background:"#F0780A", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"170px",fontSize:"1rem"}} >
                        Reimprimir Ticket
                    </button>
                    <button onClick={(e) =>{cancelaVenda(e)}} style = {{background:"#E23535", margin:"10px", border:"none", color:"white",fontFamily:"Josefin Sans",borderRadius:"11px",padding:"15px",width:"150px",fontSize:"1rem"}} >
                        Cancelar Venda
                    </button>
            </div>
            {modalVisible  &&(
                <div  className={styles.containerModal}>
                    <div className={styles.containerBtn}>
                     <button className = {styles.btnClose} onClick={()=>{closeModal()}}>{<FiX/>}</button>
                    </div> 
                        <label className={styles.labelInput} htmlFor='valor'>
                            Valor:
                        <input onChange={(e) =>{setValor(e.target.value)}} id='valor'/> 
                        </label>
                        <div><small>Selecione a forma de pagamento:</small></div>
                        <div className={styles.bodyPayments}>
                        {
                                <>
                                <div ref={color1} onClick={(e) =>{setTipo(pix.tipo_pag_id);stayClick(e)}}  className={styles.pix} key={pix.tipo_pag_id}>
                                    <div className={styles.pagamentos}>
                                        <button className={styles.btnPagamento}></button>
                                    </div>
                                    <small>{pix.nome_pagamento}</small>
                                </div>

                                <div ref={color2} onClick={(e) =>{setTipo(dinheiro.tipo_pag_id);stayClick(e)}} className={styles.money} key={dinheiro.tipo_pag_id}>
                                    <div className={styles.pagamentos}>
                                        <button className={styles.btnPagamento}></button>
                                    </div>
                                    <small>{dinheiro.nome_pagamento}</small>
                                </div>

                                <div ref={color3} onClick={(e) =>{setTipo(debito.tipo_pag_id);stayClick(e)}} className={styles.debito} key={debito.tipo_pag_id}>
                                    <div className={styles.pagamentos}>
                                        <button className={styles.btnPagamento}></button>
                                    </div>
                                    <small>{debito.nome_pagamento}</small>
                                </div>

                                <div ref={color4} onClick={(e) =>{setTipo(credito.tipo_pag_id);stayClick(e)}}  className={styles.credito} key={credito.tipo_pag_id}>
                                    <div className={styles.pagamentos}>
                                        <button className={styles.btnPagamento}></button>
                                    </div>
                                    <small>{credito.nome_pagamento}</small>
                                </div>
                                </>
                       
                        }  
                        </div>
                        <label className={styles.labelInput} htmlFor='troco'>
                            Troco:
                        <input onChange={(e) =>{setTroco(e.target.value)}} id='troco'/> 
                        </label>

                        <button onClick={(e) =>{finishPayment(e)}} className={styles.btnSend} type='submit'>
                            Finalizar
                        </button>
                      
                             
                </div>  
            )}

                <VagasControll/>
        </main>

       </> 
     
        
)}

export default Vagas;