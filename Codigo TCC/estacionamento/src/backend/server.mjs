import mysql from 'mysql'
import express  from 'express'
import { compareSync, hash } from 'bcrypt';
import bodyParser from 'body-parser'
import pkg, { verify } from 'jsonwebtoken';
const { sign } = pkg;
import cors from 'cors'
import { Router } from 'express'


// -- Import de Services
import { LoginDeUsuario } from './services/ApiFuncionario/LoginDeUsuario.mjs'
import { CadastroDeUsuario } from './services/ApiFuncionario/CadastroDeUsuario.mjs'
import { EstaCadastrado } from './middleware/EstaCadastrado.mjs';
import { AutenticacaoHash } from './middleware/AutenticacaoHash.mjs';
import { CadastroDeCliente } from './services/ApiFuncionario/GerenciamentoDeCliente.mjs';
import { DeleteCliente } from './services/ApiClientes/DeleteCliente.mjs';
import { EditaCliente } from './services/ApiClientes/EditaCliente.mjs';
import { CriaVenda } from './services/ApiVendas/GestaoVenda.mjs';
import { TotalVendas } from './services/ApiRelatorios/TotalVendas.mjs';
import { CriaDetalhe } from './services/ApiVendas/GestaoVendaDetalhe.mjs';
import { GestaoPagamentos } from './services/ApiVendas/GestaoPagamento.mjs';
import { ListaVendas } from './services/ApiVendas/ListaVendas.mjs';

const Password = process.JWT_PASSWORD = 'e2efee2f862e3751023a8149a21a2bb1'


const app = express()
const router = Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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


// FUNÇÃO DE VERIFICAÇÃO DE TOKEN
async function EstaAutenticado(req,res,next){
    const  token  =  req.headers.authorization
    console.log(token)
    if (!token){
        return res.status(401).json({ message: 'Nenhum token informado!' });
      }
  
      
        //faz um split para recuperar somente o token e remover o 'Bearer'
        const tokenArray = token.split(' ');
        const tokenValues = tokenArray[1];
        
           try{
                const decodedToken = verify(tokenValues, process.JWT_PASSWORD);
                //Recuperando o id do token
                req.sub = decodedToken.sub;
    
                 next();
            }
            catch(err){
                console.log(err)
                res.status(401).json("Token inválido!")
            }
}



    
//- Cadastro de Cliente
router.post('/cliente/cadastro',
async function(req, res){
    try{
        const {nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao } = req.body

    await CadastroDeCliente.handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao, function (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao ){

        const cliente = { nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao }
        res.send(cliente)
    })
    }
     catch(error) {
        console.log(erro)
        res.status(400).send("Erro na parte de Cadastro de Cliente")
   }


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

// - API DE VENDAS

router.get('/estacionamento/vendas', async function(req,res,next){
        try
        {
            ListaVendas.handleWithCallback((results) =>{
                res.status(200).json(results)
            })
        }
        catch(err){
            console.log(err)
        }
})

router.post('/estacionamento',
    async function(req, res){
        const { id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada } = req.body

        await CriaVenda.handle(id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada, function({id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada}){
            const Venda = { id_funcionario, id_cliente, situacao, valor_venda, valor_total, valor_recebido, troco, venda_cancelada }
            
            res.send({Venda}) 
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

// API de Relatórios
router.get('/relatorios/vendas-soma',EstaAutenticado, async function(req,res,next){
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
 router.post('/login', async function(req,res,next){
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





 
app.listen(3333, () => console.log("Servidor Online"))