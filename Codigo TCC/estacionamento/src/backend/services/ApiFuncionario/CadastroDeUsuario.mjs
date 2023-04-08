import BancoParking from "../../server.mjs"
import { promisify } from 'util'

 
  export  class CadastroDeUsuario{

        static async handle(nome,telefone,email,senha){
           const connection = await BancoParking.connect()
           let sql =  "insert into funcionario (nome,telefone,email,senha) values ( '"+ nome +"', '"+ telefone +"', '"+ email +"', '"+ senha +"')"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql,[nome,telefone,email,senha])
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao cadastrar!")
           }
           
           return results
        }

        static  handleWithCallback(nome,telefone,email,senha,callback){
          this.handle(nome,telefone,email,senha)
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }
    } 
