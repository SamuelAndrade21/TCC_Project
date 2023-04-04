import mysql from 'mysql'
import express  from 'express'
import { compare, compareSync, hash } from 'bcrypt';
import bodyParser from 'body-parser'
import pkg from 'jsonwebtoken';
const { sign } = pkg;

import cors from 'cors'
import { Router } from 'express'


// -- Import de Services
import { LoginDeUsuario } from './services/LoginDeUsuario.mjs'
import { CadastroDeUsuario } from './services/CadastroDeUsuario.mjs'
import { EstaCadastrado } from './middleware/EstaCadastrado.mjs';
import { AutenticacaoHash } from './middleware/AutenticacaoHash.mjs';
import { CadastroDeCliente } from './services/GerenciamentoDeCliente.mjs';
import { DeleteCliente } from './middleware/DeleteCliente.mjs';
import { EditaCliente } from './middleware/EditaCliente.mjs';
import { CriaVenda } from './middleware/GestaoVenda.mjs';
import { TotalVendas } from './services/ApiRelatorios/TotalVendas.mjs';

const Password = process.JWT_PASSWORD = 'e2efee2f862e3751023a8149a21a2bb1'




const app = express()
const router = Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
router.use(cors({origin:true}))



export default class BancoParking{

    static async connect(){
        const connection =  mysql.createConnection({
            host:'localhost',
            user: 'root',
            password:'1234',
            database: 'parking',
        })

        connection.connect()

        return connection
    }  

}

 // --ROTAS DE USUÁRIO 


//Função Para verificar 

//const  token  = req.headers.authorization
    
        
    // if (!token) {
    //     return res.status(401).json({ message: 'Nenhum token informado!' });
    //   }
  
      
    // else{
    //     //faz um split para recuperar somente o token e remover o 'Bearer'
    //     const tokenArray = token.split(' ');
    //     const tokenValues = tokenArray[1];

    //         try {  
    //         const decodedToken = verify(tokenValues, Password);
    //         //Recuperando o id do token
    //         req.sub = decodedToken.sub;

    //         console.log(decodedToken.sub)

    //          next();

    //         } catch (err) {
    //         return res.status(401).json({ message: 'Token inválido' }).end();
    //         }
    // }
   
  
//   };


    
//- Cadastro de Cliente
router.post('/cliente/cadastro',
async function(req, res){
    const {nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao } = req.body

    await CadastroDeCliente.handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao, function (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao ){

        const cliente = { nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao }
        res.send(cliente)
    })
})

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
router.post ('/cliente/editar',
    async function(req, res){
        const {nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id} = req.body

        await EditaCliente.handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id, function (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id){

            const EditaCliente = { nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id}

            res.send(EditaCliente)
        })
    }
)


router.post('/estacionamento',
    async function(req, res){
        const { id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada } = req.body

        await CriaVenda.handle(id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada, function({id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada}){
            const Venda = { id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada }
            
            res.send({Venda}) 
        })

    })

//--CADASTRO
router.post('/registrar',async function(req,res){
    const { nome, telefone, email, senha } = await req.body;
    const senhaHash = await hash(senha,8)           
               
                try {
                      EstaCadastrado.handleWithCallback(email, function() {
                        });      

                      CadastroDeUsuario.handleWithCallback(nome, telefone, email, senhaHash, function(nome, telefone, email, senhaHash) {
                        const user = { nome, telefone, email, senhaHash };
                        res.send(user)
                      });
          
                     
                    } 
                  catch (error)
                   {
                    console.log(error)
                   }

})


 //--LOGIN 
 router.post('/login',
 
 
 async function(req,res,next){
    const { email,senha } = req.body  

      
        try{ 

             AutenticacaoHash.handleWithCallback(email, (email) =>{
              
            
                //Recupera a senha do email que foi digitado
                if(email[0].senha){
                    const senhaHash = email[0].senha; 
                    
                    //Faz um compare com a senha digitada pelo user
                    const verificaSenha = compareSync(senha,senhaHash)

                //Caso de senhas diferentes retorna um erro
                    if(!verificaSenha){
                        res.status(400).json("Email/Senha inválido")
                        // throw new Error("Email/Senha inválido")
                    }

                    if(verificaSenha){
                        next()
                    }

                }   
                    if(email[0].senha === undefined){
                        res.status(400).json("Email/Senha inválido!")
                        return
                    }}),

             LoginDeUsuario.handleWithCallback(email,function(email){
                    
                    const user = { email }

                    if(!user){
                        res.json("Email/Senha inválido!")
                        // throw new Error("Email/Senha inválido!")
                        
                    } 

                    if(user.email[0] === undefined){
                        return;
                    }

                    else{
                    
                    //Gerando o token do usuário 
                    const token = sign(
                    {
                        user:user.email,
                        sub:user.email[0].funcionario_id
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
                        
                    res.json(userToken)
                    console.log(userToken)
                    }
        
        })}
        catch(error){
            console.log(error)
            res.status(500).json("Erro de servidor")
        }
    
    })  


// - API DE VENDAS

router.get('/relatorios/vendas-soma', async function(req,res){
    try
    {
        TotalVendas.handleWithCallback((results) =>{
            console.log(results)
            res.status(200).json(results)
        })
    }
    catch(err)
    {
        console.log(err)
    }
})
 
app.listen(3333, () => console.log("Servidor Online"))



