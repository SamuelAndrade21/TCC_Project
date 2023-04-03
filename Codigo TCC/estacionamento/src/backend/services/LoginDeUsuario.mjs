import BancoParking from "../server.mjs"
import { promisify } from "util";

 
  export  class LoginDeUsuario{

        static async handle(email){
         const connection = await BancoParking.connect()
         let sql = "select funcionario_id,nome,email from funcionario where email = ?"
         //Transformando o callback em uma Promise e definindo novamente o seu this(connection) com o metodo bind
         const query = promisify(connection.query).bind(connection)
         const results = await query(sql, email)
         connection.end()

         if (results.length === 0) {
            throw new Error("Email/Senha inválido!")
         }
         
         return results
     
         }
            
        static handleWithCallback(email, callback) {
          this.handle(email)
         .then((results) => callback(results))
         .catch((err) => callback(err))
        }
    } 

