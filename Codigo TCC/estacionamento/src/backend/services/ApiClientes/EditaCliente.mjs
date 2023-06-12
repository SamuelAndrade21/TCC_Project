import BancoParking from "../../server.mjs";
import { promisify } from "util";

export class EditaCliente {
    static async handle(nome, celular, email, cpf, veiculo, modelo, placa, cor_veiculo, cidade_estado, valor_mensalidade, cliente_id){

        const connection = await BancoParking.connect()
        const sql = "UPDATE cliente SET nome = '"+ nome +"', celular = '"+ celular +"',email = '"+ email+"', cpf = '"+ cpf +"', veiculo = '"+ veiculo +"', modelo = '"+ modelo +"', placa = '"+ placa +"', cor_veiculo = '"+ cor_veiculo +"', cidade_estado = '"+ cidade_estado +"',  valor_mensalidade = '"+ valor_mensalidade +"' WHERE cliente_id = '"+ cliente_id +"'"   
        const query = promisify(connection.query).bind(connection)
           const results = await query(sql)
           connection.end();

           if(results.length === 0){
            throw new Error("Erro ao Adicionar!")
           }
           
           return results
        }

        static  handleWithCallback(nome, celular, email, cpf, veiculo, modelo, placa, cor_veiculo, cidade_estado, valor_mensalidade, cliente_id,callback){
          this.handle(nome, celular, email, cpf, veiculo, modelo, placa, cor_veiculo, cidade_estado, valor_mensalidade, cliente_id)
         .then((results) =>  callback(results))
         .catch((err) => callback(err))
        }

    }
    
