import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class TotalVendas{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "SELECT  f.nome,SUM(vc.valor_total) as soma FROM venda_cabecalho vc INNER JOIN funcionario f ON vc.id_funcionario = f.funcionario_id WHERE vc.situacao = 'F' GROUP BY  f.nome"
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
