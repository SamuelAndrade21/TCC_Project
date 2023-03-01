import mysql from 'mysql'
import express  from 'express'

import pkg from 'jsonwebtoken';
const { sign } = pkg;

import { Router } from 'express'
import bodyParser from 'body-parser'



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




app.listen(3333, () => console.log("Servidor Online"))


