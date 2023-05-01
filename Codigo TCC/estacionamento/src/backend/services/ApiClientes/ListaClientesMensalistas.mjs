import BancoParking from '../../server.mjs'
import { promisify } from 'util'

 
  export  class ListaClientesMensalista{

        static async handle(){
           const connection = await BancoParking.connect()
           let sql = "select cliente_id,nome,celular,veiculo,placa from cliente where valor_mensalidade > 0 "
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
