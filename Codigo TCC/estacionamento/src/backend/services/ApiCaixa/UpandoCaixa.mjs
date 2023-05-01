import { promisify } from "util";
import BancoParking from "../../server.mjs";


export class UpandoCaixa{
      static async handle(valor_gaveta,caixa_id){
            const connection = await BancoParking.connect()
            const sql = 'UPDATE caixa SET valor_gaveta = "' + valor_gaveta + '",data_hora_abertura = now() WHERE caixa_id = "' + caixa_id + '"'
            const query = promisify(connection.query).bind(connection)
            const results = await query(sql)
            connection.end();

            if(!results){
                throw new Error("Valor não encontrado")
            }

            return results
        }

        static  handleWithCallback(valor_gaveta,caixa_id,callback){
            this.handle(valor_gaveta,caixa_id)
           .then((results) => callback(results))
           .catch((err) => callback(err))
          }
    }