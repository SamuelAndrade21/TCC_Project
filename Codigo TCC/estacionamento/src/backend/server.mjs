import mysql from 'mysql'
import express  from 'express'
import { LoginDeUsuario } from './services/LoginDeUsuario.mjs'
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


app.listen(3333, () => console.log("Servidor Online"))


