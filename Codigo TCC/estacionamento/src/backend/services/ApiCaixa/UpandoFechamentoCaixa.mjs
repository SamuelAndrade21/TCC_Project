import { promisify } from "util";
import BancoParking from "../../server.mjs";


export class UpandoFechamento{
      static async handle(caixa_id){
            const connection = await BancoParking.connect()
            const sql = 'UPDATE caixa SET data_hora_fechamento = now() WHERE caixa_id = "' + caixa_id + '"'
            const query = promisify(connection.query).bind(connection)
            const results = await query(sql)
            connection.end();

            if(!results){
                throw new Error("Valor não encontrado")
            }

            return results
        }

        static  handleWithCallback(caixa_id,callback){
            this.handle(caixa_id)
           .then((results) => callback(results))
           .catch((err) => callback(err))
          }
    }