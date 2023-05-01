import BancoParking from "../../server.mjs"
import { promisify } from 'util'

 
  export  class CadastraClientTemp{

        static async handle(nome,veiculo,placa){
           const connection = await BancoParking.connect()
           let sql =  "insert into cliente (nome,veiculo,placa) values ( '"+ nome +"', '"+ veiculo +"', '" + placa + "')"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql,[nome,veiculo,placa])
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao Adicionar!")
           }
           
           return results
        }

        static  handleWithCallback(nome,veiculo,placa,callback){
          this.handle(nome,veiculo,placa)
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }
    } 
