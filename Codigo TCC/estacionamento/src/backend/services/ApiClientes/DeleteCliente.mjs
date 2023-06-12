import BancoParking from "../../server.mjs";
import { promisify } from "util";

export class DeleteCliente {
    static async handle(cliente_id){
        const connection = await BancoParking.connect()
        let sql = "UPDATE cliente SET valor_mensalidade = 0 WHERE cliente_id = '" + cliente_id + "'"  
        const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao Adicionar!")
           }
           
           return results
        }

        static  handleWithCallback(cliente_id,callback){
          this.handle(cliente_id)
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }
    }