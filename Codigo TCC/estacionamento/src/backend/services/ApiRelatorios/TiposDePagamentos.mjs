import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class TiposDePagamentos{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "SELECT  tp.nome_pagamento,COUNT(vc.id_tipo_pag) as soma FROM venda_cabecalho vc INNER JOIN tipo_pagamento tp ON vc.id_tipo_pag = tp.tipo_pag_id WHERE vc.situacao = 'F' GROUP BY  tp.nome_pagamento "       
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
