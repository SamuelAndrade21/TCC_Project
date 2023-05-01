import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class UpdateCancelaVenda{

        static async handle(venda_cabecalho_id){
           const connection = await BancoParking.connect()
           let sql = "UPDATE venda_cabecalho SET situacao = 'C'  WHERE venda_cabecalho_id = '" + venda_cabecalho_id + "'"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Nenhum valor encontrado")
           }
           
           return results
          
        }

        static  handleWithCallback(venda_cabecalho_id,callback){
          this.handle(venda_cabecalho_id)
         .then((results) => callback(results))
         .catch((err) => callback(err))
        }
    } 
