import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class ListaVendasSC{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "SELECT vc.venda_cabecalho_id,vc.data_hora_venda,c.nome,c.placa,c.veiculo,vc.valor_recebido FROM venda_cabecalho vc INNER JOIN cliente c on vc.id_cliente = c.cliente_id  where vc.situacao = 'C'"
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
