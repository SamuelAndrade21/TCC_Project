import BancoParking from "../../server.mjs"
import { promisify } from 'util'

 
  export  class AlteraValorGaveta{

        static async handle(valor_diferenca,caixa_id){
           const connection = await BancoParking.connect()
           let sql =  "UPDATE caixa SET valor_gaveta = valor_gaveta + '" + valor_diferenca + "' WHERE caixa_id = '" + caixa_id + "';"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao Adicionar!")
           }
           
           return results
        }

        static  handleWithCallback(valor_diferenca,caixa_id,callback){
          this.handle(valor_diferenca,caixa_id)
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }
    } 
