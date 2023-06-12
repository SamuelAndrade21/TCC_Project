import BancoParking from "../../server.mjs"
import { promisify } from 'util'

 
  export  class CadastraClienteMensal{

        static async handle(nome,celular,email,cpf,veiculo,modelo,placa,cor_veiculo,cidade_estado,valor_mensalidade){
           const connection = await BancoParking.connect()
           let sql =  "insert into cliente (nome,celular,email,cpf,veiculo,modelo,placa,cor_veiculo,cidade_estado,valor_mensalidade) values ( '"+ nome +"', '"+ celular +"', '" + email + "', '" + cpf + "', '" + veiculo + "', '" + modelo + "','" + placa + "', '" + cor_veiculo + "','" + cidade_estado + "', '" + valor_mensalidade + "')"
           const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao Adicionar!")
           }
           
           return results
        }

        static  handleWithCallback(nome,celular,email,cpf,veiculo,modelo,placa,cor_veiculo,cidade_estado,valor_mensalidade,callback){
          this.handle(nome,celular,email,cpf,veiculo,modelo,placa,cor_veiculo,cidade_estado,valor_mensalidade)
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }
    } 
