import mysql from 'mysql'
import express  from 'express'

import pkg from 'jsonwebtoken';
const { sign } = pkg;

import { Router } from 'express'
import bodyParser from 'body-parser'

// -- Import de Services
import { LoginDeUsuario } from './services/LoginDeUsuario.mjs'
import { CadastroDeUsuario } from './services/CadastroDeUsuario.mjs'
import { EstaCadastrado } from './middleware/EstaCadastrado.mjs';
import { AutenticacaoHash } from './middleware/AutenticacaoHash.mjs';
import { CadastroDeCliente } from './services/GerenciamentoDeCliente.mjs';

import { DeleteCliente } from './middleware/DeleteCliente.mjs';
import { EditaCliente } from './middleware/EditaCliente.mjs';
import { CriaVenda } from './middleware/GestaoVenda.mjs';
import { CriaDetalhe } from './middleware/GestaoVendaDetalhe.mjs';
import { GestaoPagamentos } from './middleware/GestaoPagamento.mjs';


const app = express()
const router = Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)

export default class BancoParking{

    static async connect(){
        const connection =  mysql.createConnection({
            host:'localhost',
            user: 'root',
            password:'password',
            database: 'park',
        })

        connection.connect()

        return connection
    }  

}

 // --ROTAS DE USUÁRIO
router.post('/login',async function(req,res){
    const {email,senha} =  req.body
  
    LoginDeUsuario.handle(senha,email,function(email,senha){
        const user = {email,senha}
             res.send(user)
           
        
    })
})


//--CADASTRO


router.post('/registrar',async function(req,res,next){
    const { email } = req.body
    await EstaCadastrado.handle(email, async function(email) {
        
        if(!email){
            res.status(400).send('Usuario já cadastrado')
        }

        else{
            console.log('Usuário cadastrado com sucesso!')
            next();
        }
        })  
    }, 
 
    async function(req, res) {
        const { nome, telefone, email, senha } = await req.body;
        try {
            const user = { email };
            console.log(user)
            
        if(user){ 
            await CadastroDeUsuario.handle(nome,telefone,email,senha, function(nome,telefone,email,senha){
                
                const user = { nome,telefone,email,senha }
                res.send(user)
            })
        }    
        }

        catch (error)
        {
        console.log(error);
        res.status(500).send("Internal server error");
        }
})


 //--LOGIN 
 router.post('/login',
 
 
 async function(req,res,next){
    const { email,senha,nome } = req.body
        try{ 
            await AutenticacaoHash.handle(email, (email) =>{
              
                //Recupera a senha do email que foi digitado
                    const senhaHash = email[0].senha;


                //Faz um compare com a senha digitada pelo user
                    const verificaSenha = compareSync(senha,senhaHash)


                //Caso de senhas diferentes retorna um erro
                    if(!verificaSenha){
                        res.status(400).send("Email/Senha inválido!")
                    }
        
                    else{
                        next();
                    }}),

            await LoginDeUsuario.handle(email,function(email){
                    
                    const user = { email }

                    if(!user){
                        res.status(400).send("Email inválido!")
                        throw new Error("Email/Senha inválido!")
                    } 
                    
                    else{
                    
                    //Gerando o token do usuário 
                    const token = sign(
                    {

                        user:user.email,
                    },
                    process.env.JWT_PASSWORD,
                    {
                        expiresIn:'30d'
                    })
                        //Devolvendo o usuário mais o token
                        const userToken = {
                            user,
                            token
                        }
                    res.send(userToken) 
                    }
        
        })}
        catch(error){
            console.log(error)
            res.status(500).send("Erro interno de servidor")
        }
    
    })  
    
    
// Cadastro de Cliente
router.post('/GerenciamentoDeCliente'), async (req, res ) => {
   try{
    const{ nome, celular, email, cpf, veiculo, placa, valorMensal }  =  await req.body
    await CadastroDeCliente.handle(nome, celular, email, cpf, veiculo, placa, valorMensal, function (nome, celular, email, cpf, veiculo, placa, valorMensal){


    const cliente = {nome, celular, email, cpf, veiculo, placa, valorMensal}
    res.send(cliente)
    })
   } catch(error) {
        console.log(erro)
        res.status(400).send("Erro na parte de Cadastro de Cliente")
   }


}

// //- Exclusão de Cliente
router.post('/cliente/deleta',
    async function(req, res){
        const { cliente_id } = req.body

        await DeleteCliente.handle(cliente_id, function (cliente_id){

            const deleta = { cliente_id}
            res.json(deleta)

        })
    }
)
// - Edição de Cliente
router.post ('/editacliente',
    async function(req, res){
        const {nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id} = req.body
        await EditaCliente.handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id, function (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id){
            const EditaCliente = { nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id}
            res.send(EditaCliente)
        })
    }
)
// - API de Vendas 
router.post('/estacionamento',
    async function(req, res){
        const { id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada } = req.body
        await CriaVenda.handle(id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada, function(id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada){
            const Venda = { id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada }
            res.send(Venda) 
        })
    })
router.post('/estacionamento/detalhe',
    async function(req, res){
        const {id_venda_cabecalho, veiculo, modelo, placa, ano } = req.body
        await CriaDetalhe.handle(id_venda_cabecalho, veiculo, modelo, placa, ano, function(id_venda_cabecalho, veiculo, modelo, placa, ano){
            
            const detalhe = {id_venda_cabecalho, veiculo, modelo, placa, ano}
            res.send(detalhe)
        
        }) 
        
    })
router.post('/pagamento',
    async function(req, res){
        const {venda_cabecalho_id, situacao, valor_recebido, troco} = req.body

        await GestaoPagamentos.handle(venda_cabecalho_id, situacao, valor_recebido, troco, function(venda_cabecalho_id, situacao, valor_recebido, troco){

            const pagamento = { venda_cabecalho_id, situacao, valor_recebido, troco}

            res.send(pagamento)
        })

    }
)

 




app.listen(3333, () => console.log("Servidor Online"))