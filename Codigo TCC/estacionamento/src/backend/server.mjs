import mysql from 'mysql'
import express  from 'express'
import { compare, compareSync, hash } from 'bcrypt';

import pkg from 'jsonwebtoken';
const { sign } = pkg;

import cors from 'cors'
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

const app = express()
const router = Router()
const Password = process.JWT_PASSWORD = 'e2efee2f862e3751023a8149a21a2bb1'


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
router.use(cors({origin:true}))



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


//--CADASTRO
router.post('/registrar',async function(req,res,next){
    const { email } = req.body;
    const token = req.headers.authorization

    if(!token){
        res.status(400).send('Error ao gerar token')
         }
    

    await EstaCadastrado.handle(email, async function(email) {
        
        



        //Verifica o email e manda uma mensagem de erro
        if(!email){
            res.status(400).send('Usuario já cadastrado')
        }

        //Caso não, ele passa pra próxima função (CadastroDeUsuario) e a executa
        else{
            console.log('Usuário cadastrado com sucesso!')
            
        }
        next();
        })  
    }, 
    
 
    async function(req, res) {  
        const { nome, telefone, email, senha } = await req.body;
         const senhaHash = await hash(senha,8)

        try {
            const user = { email };
            console.log(user)
            
        if(user){ 
            await CadastroDeUsuario.handle(nome,telefone,email,senhaHash, function(nome,telefone,email,senhaHash){
                
                const user = { nome,telefone,email,senhaHash }
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
    const { email,senha } = req.body    
    
        try{ 
            await AutenticacaoHash.handle(email, (email) =>{
              
                //Recupera a senha do email que foi digitado
                    const senhaHash = email[0].senha;


                //Faz um compare com a senha digitada pelo user
                    const verificaSenha = compareSync(senha,senhaHash)


                //Caso de senhas diferentes retorna um erro
                    if(!verificaSenha){
                        res.status(400).json("Email/Senha inválido")
                        throw new Error("Email/Senha inválido")
                    }
        
                    else{
                        next();
                    }}),

            await LoginDeUsuario.handle(email,function(email){
                    
                    const user = { email }

                    if(!user){
                        res.status(400).json("Email/Senha inválido!")
                        throw new Error("Email/Senha inválido!")
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
                    res.send(userToken) 
                    }
        
        })}
        catch(error){
            console.log(error)
            res.status(500).json("Erro de servidor")
        }
    
    }) 
    
//- Cadastro de Cliente
router.post('/cadastrocliente',
async function(req, res){
    const {nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao } = req.body

    await CadastroDeCliente.handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao, function (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao ){

        const cliente = { nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao }
        res.send(cliente)
    })
})

//- Exclusão de Cliente
router.post('/deletecliente',
    async function(req, res){
        const { cliente_id } = req.body

        await DeleteCliente.handle(cliente_id, function (cliente_id){

            const deleta = { cliente_id}
            res.send(deleta)

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
 
app.listen(3333, () => console.log("Servidor Online"))



