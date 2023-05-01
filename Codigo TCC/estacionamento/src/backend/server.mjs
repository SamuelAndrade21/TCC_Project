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
import { ListaVendas } from './services/ApiVendas/ListaVendas.mjs';
import { ListaVendasSF } from './services/ApiVendas/ListaVendasSF.mjs';
import { ListaVendasSC } from './services/ApiVendas/ListaVendasSC.mjs'
import { ListaVendasSA } from './services/ApiVendas/ListaVendasSA.mjs';
import { CadastraClientTemp } from './services/ApiClientes/CadastraClienteTemp.mjs';
import { AdicionandoUserTemp } from './services/ApiVendas/AdicionandoUserTemp.mjs';
import { ListaClientesMensalista } from './services/ApiClientes/ListaClientesMensalistas.mjs';
import { UpdateVendaCabecalho } from './services/ApiVendas/UpdateVendaCabecalho.mjs';
import { ListaPagamentosAtivos } from './services/ApiPagamentos/ListaPagamentosAtivos.mjs';
import { UpdateCancelaVenda } from './services/ApiVendas/UpdateCancelaVenda.mjs'
import { TiposDePagamentos } from './services/ApiRelatorios/TiposDePagamentos.mjs';
import { TipoDeClientes } from './services/ApiRelatorios/TiposDeClientes.mjs';
import { VendasPordDia } from './services/ApiRelatorios/VendasPorDia.mjs';
import { ListandoCaixas } from './services/ApiCaixa/ListandoCaixas.mjs';
import { UpandoCaixa } from './services/ApiCaixa/UpandoCaixa.mjs';
import { UpandoFechamento } from './services/ApiCaixa/UpandoFechamentoCaixa.mjs';
import { CriandoNovoCaixa } from './services/ApiCaixa/CriandoNovoCaixa.mjs';


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


router.post('/cliente/temporario/cadastro', async function(req,res){
    const { nomeTemp,veiculoTemp,placaTemp } = await req.body
    
    try{
        CadastraClientTemp.handleWithCallback(nomeTemp,veiculoTemp,placaTemp, (nomeTemp,veiculoTemp,placaTemp) =>{
            const cliente = {nomeTemp,veiculoTemp,placaTemp}
            res.status(200).json(cliente)
        })
    }
    catch(err){
        console.log("Error")
    }
})
    
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
router.delete('/cliente/deleta',
    async function(req, res){
        const { cliente_id } = req.body

        await DeleteCliente.handle(cliente_id, function (cliente_id){

            const deleta = { cliente_id}
            res.json(deleta)

        })
    }
)

// - Edição de Cliente
router.put ('/cliente/editar',
    async function(req, res){
        const {nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id} = req.body

        await EditaCliente.handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id, function (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id){

            const EditaCliente = { nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id}

            res.send(EditaCliente)
        })
    }
)

// - API DE VENDAS

// CADASTRA CLIENTE TEMPORÁRIO NA VENDA LISTA
router.post('/estacionamento/vendas-cadastro', async function(req,res){
    const { id_funcionario,id_cliente,id_caixa,situacao } = await req.body

    try
    {
        AdicionandoUserTemp.handleWithCallback(id_funcionario,id_cliente,id_caixa,situacao,function(id_funcionario,id_cliente,id_caixa,situacao){
        const userTemp = {id_funcionario,id_cliente,id_caixa,situacao}
        res.send(userTemp)
        })
    }
    catch(err){
        console.log(err)
    }
})

// LISTAGEM DE TODOS OS CLIENTES MENSLISTAS

router.get('/estacionamento/clientes-mensalistas', async function(req,res){
    try
    {
        ListaClientesMensalista.handleWithCallback((results) =>{
            res.send(results)
        })
    }
    catch(error){
        console.log("Erro ao consultar")
    }
})

router.get('/estacionamento/vendas',EstaAutenticado, async function(req,res,next){
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

// PEGA LISTA DE VENDAS COM SITUAÇÃO IGUAL A 'F'

router.get('/estacionamento/vendas-finalizadas', async function(req,res,next){
    try
    {
        ListaVendasSF.handleWithCallback((results) =>{
            res.status(200).json(results)
        })
    }
    catch(err){
        console.log(err)
    }
})

// PEGA LISTA DE VENDAS COM SITUAÇÃO IGUAL A 'C'

router.get('/estacionamento/vendas-canceladas', async function(req,res,next){
    try
    {
        ListaVendasSC.handleWithCallback((results) =>{
            res.status(200).json(results)
        })
    }
    catch(err){
        console.log(err)
    }
})

// PEGA LISTA DE VENDAS COM SITUAÇÃO IGUAL A 'A'

router.get('/estacionamento/vendas-aguardando', async function(req,res,next){
    try
    {
        ListaVendasSA.handleWithCallback((results) =>{
            res.status(200).json(results)
        })
    }
    catch(err){
        console.log(err)
    }
})

// UPDATE E INSERÇÃO DE PAGAMENTO DA VENDA CABECALHO
router.post('/estacionamento/finaliza-venda',async function(req,res){
    const { valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id } = await req.body
    try
    {
        UpdateVendaCabecalho.handleWithCallback(valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id,(valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id)=>{
            const updateVenda = {valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id}
            res.status(200).send(updateVenda)
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json("Error")
    }
})

// UPDATE DE VENDA CABEÇALHO PARA CANCELADA
router.post('/estacionamento/cancela-venda',async function(req,res){
    const { venda_cabecalho_id } = await req.body
    try
    {
        UpdateCancelaVenda.handleWithCallback(venda_cabecalho_id,(venda_cabecalho_id)=>{
            const updateVenda = {venda_cabecalho_id}
            res.status(200).send(updateVenda)
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json("Error")
    }
})


// - API DE PAGAMENTOS

// LISTA TODOS OS PAGAMENTOS COM SITUAÇÃO IGUAL A 'V'
router.get('/estacionamento/pagamentos', async function(req,res){
    try
    {
        ListaPagamentosAtivos.handleWithCallback((results) =>{
            res.status(200).json(results)
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json("Error")
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

// LISTA TIPOS PAGAMENTOS
router.get('/relatorios/tipos-pagamentos', async function(req,res,next){
    try
    {
        TiposDePagamentos.handleWithCallback((results) =>{
            console.log(results)
            res.status(200).json(results)
        })
        
    }
    catch(err)
    {
        console.log(err)
    }
})

// LISTA TIPOS DE CLIENTES
router.get('/relatorios/tipos-clientes', async function(req,res,next){
    try
    {
        TipoDeClientes.handleWithCallback((results) =>{
            console.log(results)
            res.status(200).json(results)
        })
        
    }
    catch(err)
    {
        console.log(err)
    }
})

// LISTA DE VENDAS POR DIA
router.get('/relatorios/vendas-por-dia', async function(req,res,next){
    try
    {
        VendasPordDia.handleWithCallback((results) =>{
            console.log(results)
            res.status(200).json(results)
        })
        
    }
    catch(err)
    {
        console.log(err)
    }
})

// - API DO CAIXA

// LISTANDO TODOS OS CAIXAS
router.get('/caixa/lista-caixas', async function(req,res,next){
    try
    {
        ListandoCaixas.handleWithCallback((results) =>{
            console.log(results)
            res.status(200).json(results)
        })
        
    }
    catch(err)
    {
        console.log(err)
    }
})

// ABRINDO CAIXA

router.put('/caixa/abrir-caixa', async function(req,res,next){
    const { valor_gaveta,caixa_id } = await req.body
    try
    {
        UpandoCaixa.handleWithCallback(valor_gaveta,caixa_id,(valor_gaveta,caixa_id) =>{
            const updateCaixa = {valor_gaveta,caixa_id}
            res.status(200).send(updateCaixa)
        })
    }
    catch(err){
        res.status(400).json({"error":"Erro ao acessar"})
    }
})

// FECHANDO CAIXA

router.put('/caixa/fechar-caixa', async function(req,res,next){
    const { caixa_id } = await req.body
    try
    {
        UpandoFechamento.handleWithCallback(caixa_id,(caixa_id) =>{
            const updateCaixaFechamento = {caixa_id}
            res.status(200).send(updateCaixaFechamento)
        })
    }
    catch(err){
        res.status(400).json({"error":"Erro ao acessar"})
    }
})

// CRIAÇÃO DE NOVO CAIXA
router.post('/caixa/criar-caixa',async function(req,res){
    try
    {
        CriandoNovoCaixa.handleWithCallback((results)=>{
            res.status(200).send(results)
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json("Error")
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