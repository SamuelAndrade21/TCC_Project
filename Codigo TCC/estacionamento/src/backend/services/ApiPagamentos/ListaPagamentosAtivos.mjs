import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class ListaPagamentosAtivos{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "SELECT tipo_pag_id,nome_pagamento,permite_troco FROM tipo_pagamento WHERE situacao = 'V'"
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
