import BancoParking from "../server.mjs";

export class CadastroDeCliente{
    
    static async handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao, callback){
        const connection = await BancoParking.connect()

        let CadastraCliente = "INSERT INTO CLIENTE (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao) values ( '"+ nome +"', '"+ celular+"', '"+ email +"','"+ cpf +"','"+ rg +"', '"+ veiculo +"', '"+ modelo +"', '"+ placa +"', '"+ cor_veiculo +"', '"+ ano +"', '"+ cidade_estado +"', '"+ bairro +"', '"+ rua +"', '"+ numero_casa +"', '"+ valor_mensalidade +"', '"+ situacao +"' )"
        
        let query = await connection.query(CadastraCliente, function(err, result, fields){
            if(err) throw new Error(err)


            callback(result)
            
        })

        console.log(query.CadastraCliente)
        connection.end()

    }
}


    /*export class EditaCliente {
         static async handle()
    }*/

    export class DeleteCliente {

        static async handle(cliente_id){
           const connection = await BancoParking.connect()
           let DeleteCliente = "UPDATE cliente SET situacao = 0 WHERE CLIENTE_ID = '" + cliente_id + "';"

           let query = connection.query(DeleteCliente, function(err, result, fields){
                if (err) throw new Error(err)

                callback(result)
           })


           console.log(query.DeleteCliente)
           connection.end()
        }
   }
