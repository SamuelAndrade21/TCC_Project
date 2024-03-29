import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class TipoDeClientes{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "SELECT  COUNT(cliente_id) as countMensalistas FROM cliente WHERE valor_mensalidade > 0 UNION SELECT COUNT(cliente_id) as countTemp FROM cliente WHERE valor_mensalidade IS NULL"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Nenhum valor encontrado")
           }
           
           return results
          
        }

        static  handleWithCallback(callback){
          this.handle()
         .then((results) => callback(results))
         .catch((err) => callback(err))
        }
    } 
