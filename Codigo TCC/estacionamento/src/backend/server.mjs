import mysql from 'mysql'
import express  from 'express'
import { compare, compareSync, hash } from 'bcrypt';

import pkg from 'jsonwebtoken';
const { sign } = pkg;

import { Router } from 'express'
import bodyParser from 'body-parser'

// -- Import de Services
import { LoginDeUsuario } from './services/LoginDeUsuario.mjs'
import { CadastroDeUsuario } from './services/CadastroDeUsuario.mjs'
import { EstaCadastrado } from './middleware/EstaCadastrado.mjs';
import { AutenticacaoHash } from './middleware/AutenticacaoHash.mjs';

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
            password:'1234',
            database: 'parking',
        })

        connection.connect()

        return connection
    }  

}

 // --ROTAS DE USUÁRIO 

//--CADASTRO
router.post('/registrar',async function(req,res,next){
    const { email } = req.body
    await EstaCadastrado.handle(email, async function(email) {
        
        //Verifica o email e manda uma mensagem de erro
        if(!email){
            res.status(400).send('Usuario já cadastrado')
        }

        //Caso não, ele passa pra próxima função (CadastroDeUsuario) e a executa
        else{
            console.log('Usuário cadastrado com sucesso!')
            next();
        }
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
     
 



app.listen(3333, () => console.log("Servidor Online"))


