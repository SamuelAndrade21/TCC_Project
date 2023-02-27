import mysql from 'mysql'
import express  from 'express'

import { Router } from 'express'
import bodyParser from 'body-parser'

// -- Import de Services
import { LoginDeUsuario } from './services/LoginDeUsuario.mjs'
import { CadastroDeUsuario } from './services/CadastroDeUsuario.mjs'

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

 //--LOGIN 
router.post('/login',async function(req,res){
    const {email,senha} =  req.body

    LoginDeUsuario.handle(senha,email,function(email,senha){
        const user = {email,senha}
             res.send(user)       
    })
})


//--CADASTRO
router.post('/registrar', async function(req,res){
    const { nome,telefone,email,senha } =  await req.body

    CadastroDeUsuario.handle(nome,telefone,email,senha,function(nome,telefone,email,senha){
        const user  = { nome,telefone,email,senha }
        res.send(user)
    })

})


app.listen(3333, () => console.log("Servidor Online"))


