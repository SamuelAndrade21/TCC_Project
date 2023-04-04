import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class TotalVendas{

        static async handle(callback){
           const connection = await BancoParking.connect()
           let sql = "SELECT vc.venda_cabecalho_id,f.nome,sum(vc.valor_total) FROM venda_cabecalho vc INNER JOIN funcionario f on vc.id_funcionario = f.funcionario_id GROUP BY vc.venda_cabecalho_id, f.nome"
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
