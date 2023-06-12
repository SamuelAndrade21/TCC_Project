import React from "react"; 
import styles from '../css_pages/clientes.module.css';
import  Navbar  from '../layout/Navbar'
import { BiUserPlus } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect,useState,useRef } from "react";
import { api } from "./../apiClient.mjs"
import { FiXCircle } from "react-icons/fi";
import { toast } from "react-toastify";

function Clientes(){
useEffect(() => {
    async function responseClient(){
        const responseClientDados = (api).get('estacionamento/clientes-mensalistas')
        const arrayResponse = Object.values((await responseClientDados).data)
        setDadosClient(arrayResponse)
    }

    responseClient()

},[])

const valor_mensalidade =  localStorage.getItem("mensalidade")
const [ dadosClient,setDadosClient ] = useState([])
const [ modalCadastraClient, setCadastraClient ] = useState(false)
const [ modalEditaClient, setEditaClient ] = useState(false)
const [  nome,setName ] = useState("")
const [  email,setEmail ] = useState("")
const [  cpf,setCpf ] = useState("")
const [  veiculo,setVeiculo ] = useState("")
const [  modelo,setModelo ] = useState("")
const [  placa,setPlaca ] = useState("")
const [  celular,setCelular ] = useState("")
const [  cor_veiculo,setCorCarro ] = useState("")
const [  cidade_estado,setCidadeEstado ] = useState("")
const [  dados, setDados ] = useState([])



async function openModalClient(e){
    e.preventDefault()
    setCadastraClient(true)
}

 function openModalEditaClient(cliente_id,nome,email,celular,cpf,veiculo,modelo,placa,cor_veiculo,cidade_estado){

    let dadosClient = []
    dadosClient.push(cliente_id,nome,email,celular,cpf,veiculo,modelo,placa,cor_veiculo,cidade_estado)
    setDados(dadosClient)
    setEditaClient(true)
    console.log(dados[1])
}

async function addClient(e){
    e.preventDefault()
    
    async function responseClientDados(){
        const responseClientDados = (api).get('estacionamento/clientes-mensalistas')
        const arrayResponse = Object.values((await responseClientDados).data)
        setDadosClient(arrayResponse)
    }
    const cliente_id = dados[0]
    
    const responseClient = await (api).post('cliente/mensalistas/cadastro',{
        nome, 
        celular, 
        email, 
        cpf,
        veiculo,
        modelo, 
        placa, 
        cor_veiculo, 
        cidade_estado,
        valor_mensalidade,
        cliente_id
    })

    if(responseClient.data === undefined){
        toast.error("Erro ao cadastrar o cliente")    
    }

    else
    {
        toast.success("Cliente cadastrado com sucesso!")
        responseClientDados()
    }
    
}

async function deleteClient(cliente_id){
    console.log(cliente_id)

    const responseClient = await (api).post('cliente/mensalistas/deleta',{
        cliente_id
    })

    async function responseClientDados(){
        const responseClientDados = (api).get('estacionamento/clientes-mensalistas')
        const arrayResponse = Object.values((await responseClientDados).data)
        setDadosClient(arrayResponse)
    }
    
   

    if(responseClient.data === undefined){
        toast.error("Erro deletar cliente")    
    }

    else
    {
        toast.success("Cliente deletado com sucesso!")
        responseClientDados()
    }
}

async function editClient(e){
    e.preventDefault()
   
    const valor_mensalidade =  10
    const cliente_id = dados[0]
    console.log(cliente_id)
    async function responseClientDados(){
        const responseClientDados = (api).get('estacionamento/clientes-mensalistas')
        const arrayResponse = Object.values((await responseClientDados).data)
        setDadosClient(arrayResponse)
    }
    
    const responseClient = await (api).put('cliente/mensalistas/editar',{
        nome, 
        celular, 
        email, 
        cpf,
        veiculo,
        modelo, 
        placa, 
        cor_veiculo, 
        cidade_estado,
        valor_mensalidade,
        cliente_id
    })

    if(responseClient.data === undefined){
        toast.error("Erro ao editar o cliente")    
    }

    else
    {
        toast.success("Cliente editado com sucesso!")
        responseClientDados()
    }
    
}

function closeModal(){
    setCadastraClient(false)
    setEditaClient(false)
}

  
    return (           
    <section>
        <div className={styles.container}>
            <Navbar/>
            <div className={styles.bodyCliente}>
                <h1>Lista de clientes</h1>
                <table className={styles.tableBody}>
                    <thead>
                        <tr className={styles.teste}>
                            
                            <th className={styles.bodyOptions}>
                            <button onClick={(e) =>{openModalClient(e)}} className={styles.btnAddUser}><BiUserPlus/></button>
                               <p>Opções</p> 
                            </th>
                            <th>
                                Id
                            </th>
                            <th>
                                Nome
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Celular
                            </th>
                            <th>
                                CPF
                            </th>
                            <th>
                                Veículo
                            </th>
                            <th>
                                Modelo
                            </th>
                            <th>
                                Placa
                            </th>
                            <th>
                                Cor do Veículo
                            </th>
                            <th>
                                Cidade/Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {dadosClient &&(
                        dadosClient.map((dados) => (
                            <>
                        <tr key={dados.cliente_id}>  
                         <td><div className={styles.bodyOptions}><button onClick={() =>{openModalEditaClient(dados.cliente_id,dados.nome,dados.email,dados.celular,dados.cpf,dados.veiculo,dados.modelo,dados.placa,dados.cor_veiculo,dados.cidade_estado)}} className={styles.btnEdit}><FaRegEye/></button><button onClick={() =>{deleteClient(dados.cliente_id)}} className={styles.btnTrash}><FaTrashAlt/></button> </div></td> 
                            <td>{dados.cliente_id}</td>
                            <td>{dados.nome}</td>
                            <td>{dados.email}</td>
                            <td>{dados.celular}</td>
                            <td>{dados.cpf}</td>
                            <td>{dados.veiculo}</td>
                            <td>{dados.modelo}</td>
                            <td>{dados.placa}</td>
                            <td>{dados.cor_veiculo}</td>
                            <td>{dados.cidade_estado}</td>
                        </tr>
                            </>
                        ))
                          
                       )

                       }

                     </tbody>
                </table>
            </div>
            {modalCadastraClient &&(
                        <div className={styles.modal}>
                    <form className={styles.formulario} method="post">
                       <button onClick={(e)=>{closeModal(e)}} className={styles.closeModal}><FiXCircle/></button>
                    <h1 className={styles.title2}> Cadastro de Cliente</h1>
                        
                        <label className={styles.label}>
                            <span>Nome:</span>
                            <input onChange={(e) =>{setName(e.target.value)}} type="text" name="nome" className={styles.campo} placeholder="Digite nome do cliente" required=""/>
                        </label>
                        
                        <label className={styles.label}>
                            <span>E-mail:</span>
                            <input onChange={(e) =>{setEmail(e.target.value)}} type="email" name="email" className={styles.campo} placeholder="Digite o e-mail" required=""/>
                        </label>
                        
                        <label className={styles.label}>
                            <span>Celular:</span>
                            <input onChange={(e) =>{setCelular(e.target.value)}} type="text" name="celular" className={styles.campo} placeholder="Digite o celular" required=""/>   
                        </label>
                        
                        <label className={styles.label}>
                            <span>CPF:</span>
                            <input onChange={(e) =>{setCpf(e.target.value)}} type="text" name="celular" className={styles.campo} placeholder="Digite o CPF" required=""/>   
                        </label>
                        
                        <label className={styles.label}>
                            <span>Veículo:</span>
                            <input onChange={(e) =>{setVeiculo(e.target.value)}} type="text" name="veiculo" className={styles.campo} placeholder="Digite o veículo" required=""/>   
                        </label>

                        <label className={styles.label}>
                            <span>Placa</span>
                            <input onChange={(e) =>{setPlaca(e.target.value)}}  type="text" name="placa" className={styles.campo} placeholder="Digite a placa" required=""/>   
                        </label>

                        
                        <label className={styles.label}>
                            <span>Modelo:</span>
                            <input onChange={(e) =>{setModelo(e.target.value)}} type="text" name="modelo" className={styles.campo} placeholder="Digite o modelo" required=""/>   
                        </label>

                        <label className={styles.label}>
                            <span>Cor do carro:</span>
                            <input onChange={(e) =>{setCorCarro(e.target.value)}} type="text" name="cor_do_carro" className={styles.campo} placeholder="Digite a cor do carro" required=""/>   
                        </label>

                        <label className={styles.label}>
                            <span>Cidade/Estado</span>
                            <input onChange={(e) =>{setCidadeEstado(e.target.value)}}  type="text" name="cidade_estado" className={styles.campo} placeholder="Digite a Cidade/Estado" required=""/>   
                        </label>

                                        
                        <label className={styles.label}> 
                            
                            <input type="hidden" name="acao" value="enviar"/> 
                            <button onClick={addClient} type="submit" className={styles.botao}> Enviar </button>
                        
                        </label>
                    </form>

                        </div>
                       )

                       }

                {modalEditaClient &&(
                        <div className={styles.modal}>
                    <form className={styles.formulario} method="post">
                       <button onClick={(e)=>{closeModal(e)}} className={styles.closeModal}><FiXCircle/></button>
                    <h1 className={styles.title2}> Dados do Cliente</h1>
                        
                        <label className={styles.label}>
                            <span>Nome:</span>
                            <input readOnly onChange={(e) =>{setName("" ? dados[1] : e.target.value)}} defaultValue={dados[1]} type="text" name="nome" className={styles.campo} placeholder="Digite nome do cliente" required=""></input>
                        </label>
                        
                        <label className={styles.label}>
                            <span>E-mail:</span>
                            <input readOnly onChange={(e) =>{setEmail(e.target.value || dados[2])}} defaultValue={dados[2]} type="email" name="email" className={styles.campo} placeholder="Digite o e-mail" required=""/>
                        </label>
                        
                        <label className={styles.label}>
                            <span>Celular:</span>
                            <input readOnly onChange={(e) =>{setCelular(e.target.value || dados[3])}} defaultValue={dados[3]} type="text" name="celular" className={styles.campo} placeholder="Digite o celular" required=""/>   
                        </label>
                        
                        <label className={styles.label}>
                            <span>CPF:</span>
                            <input readOnly onChange={(e) =>{setCpf(e.target.value || dados[4])}} defaultValue={dados[4]} type="text" name="celular" className={styles.campo} placeholder="Digite o CPF" required=""/>   
                        </label>
                        
                        <label className={styles.label}>
                            <span>Veículo:</span>
                            <input readOnly onChange={(e) =>{setVeiculo(e.target.value || dados[5])}} defaultValue={dados[5]} type="text" name="veiculo" className={styles.campo} placeholder="Digite o veículo" required=""/>   
                        </label>

                        <label className={styles.label}>
                            <span>Placa</span>
                            <input readOnly onChange={(e) =>{setPlaca(e.target.value || dados[6])}} defaultValue={dados[6]}  type="text" name="placa" className={styles.campo} placeholder="Digite a placa" required=""/>   
                        </label>

                        
                        <label className={styles.label}>
                            <span>Modelo:</span>
                            <input readOnly onChange={(e) =>{setModelo(e.target.value || dados[7])}} defaultValue={dados[7]} type="text" name="modelo" className={styles.campo} placeholder="Digite o modelo" required=""/>   
                        </label>

                        <label className={styles.label}>
                            <span>Cor do carro:</span>
                            <input readOnly onChange={(e) =>{setCorCarro(e.target.value || dados[8])}} defaultValue={dados[8]} type="text" name="cor_do_carro" className={styles.campo} placeholder="Digite a cor do carro" required=""/>   
                        </label>

                        <label className={styles.label}>
                            <span>Cidade/Estado</span>
                            <input readOnly onChange={(e) =>{setCidadeEstado(e.target.value || dados[9])}} defaultValue={dados[9]} type="text" name="cidade_estado" className={styles.campo} placeholder="Digite a Cidade/Estado" required=""/>   
                        </label>                   

                    </form>

                        </div>
                       )

                       }
            
        </div>
    </section>
    )
    }

export default Clientes;