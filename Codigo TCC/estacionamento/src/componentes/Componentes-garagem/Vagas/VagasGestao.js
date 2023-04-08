import styles from './vagas.module.css'
import { useState,useEffect } from 'react';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { VagasControll } from './elements/Vagas-Controll/VagasControll';
import { api } from '../../apiClient.mjs';
import { toast } from 'react-toastify';

function Vagas(){
    const [ vendas,setVendas ] = useState([])

    async function handleVendas(event){
        event.preventDefault()

        try
        {
            const response = api.get('/estacionamento/vendas')
            const vendasArray = Object.values((await response).data)

            if(!(await response).data){
                throw new Error("Erro ao pegar as infos")
            }

            setVendas(vendasArray)
            toast.success("Lista atualizada!")
            console.log(vendas)
        }
        catch(err)
        {
            console.log(err)
        }
    }


    return(
        <> 
        <main className={styles.container}>
            <div className={styles.conatinerButton}>
            <button type='submit' onClick={(e) => handleVendas(e)} className={styles.btnVendas}><BsArrowCounterclockwise/></button><p>Listar vendas</p>
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
                    <ul key={venda.venda_cabecalho_id} className = {styles.ListClient}>
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