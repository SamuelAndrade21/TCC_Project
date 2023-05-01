import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class UpdateVendaCabecalho{

        static async handle(valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id){
           const connection = await BancoParking.connect()
           let sql = "UPDATE venda_cabecalho SET situacao = 'F', valor_venda = '" + valor_venda + "', valor_total = '" + valor_total + "', valor_recebido = '" + valor_recebido + "' , troco = '" + troco + "', id_tipo_pag = '" + id_tipo_pag + "' WHERE venda_cabecalho_id = '" + venda_cabecalho_id + "'"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Nenhum valor encontrado")
           }
           
           return results
          
        }

        static  handleWithCallback(valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id,callback){
          this.handle(valor_venda,valor_total,valor_recebido,troco,id_tipo_pag,venda_cabecalho_id)
         .then((results) => callback(results))
         .catch((err) => callback(err))
        }
    } 
