import BancoParking from "../server.mjs";
import { promisify } from "util";

export class AutenticacaoHash{
   static async handle(email){
       let connection = await BancoParking.connect() 
       const sql = "select senha,nome from funcionario where email = '" + email + "'"
       const query = promisify(connection.query).bind(connection)
       const results = await query(sql,email)
       connection.end();

        if (results.length === 0) {
           console.log("Email/Senha inválido!")
           return
        }
        return results
        }

    static handleWithCallback(email,callback){
        this.handle(email)
       .then((results) => callback(results))
       .catch((err) => callback(email))
      }

}

