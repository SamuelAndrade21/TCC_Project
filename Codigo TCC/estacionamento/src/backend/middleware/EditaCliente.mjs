import BancoParking from "../server.mjs";

export class EditaCliente {
    static async handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, cliente_id, callback){

        const connection = await BancoParking.connect()
        const sql = "UPDATE cliente SET nome = '"+ nome +"', celular = '"+ celular +"',email = '"+ email+"', cpf = '"+ cpf +"', rg = '"+ rg +"', veiculo = '"+ veiculo +"', modelo = '"+ nome +"', placa = '"+ placa +"', cor_veiculo = '"+ cor_veiculo +"', ano = '"+ ano +"', cidade_estado = '"+ cidade_estado +"', bairro = '"+ bairro +"', rua = '"+ rua +"',numero_casa = '"+ numero_casa +"', valor_mensalidade = '"+ valor_mensalidade +"' WHERE cliente_id = '"+ cliente_id +"'"   
        connection.query(sql, function(err, results, fields){
            if (err) throw new Error(err)

            callback(results)
           
        })
        connection.end()
    }
    
}