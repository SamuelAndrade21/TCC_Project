import BancoParking from "../../server.mjs";

export class CadastroDeCliente{
    
    static async handle(nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao, callback){
        const connection = await BancoParking.connect()
        let sql = "INSERT INTO CLIENTE (nome, celular, email, cpf, rg, veiculo, modelo, placa, cor_veiculo, ano, cidade_estado, bairro, rua, numero_casa, valor_mensalidade, situacao) values ( '"+ nome +"', '"+ celular+"', '"+ email +"','"+ cpf +"','"+ rg +"', '"+ veiculo +"', '"+ modelo +"', '"+ placa +"', '"+ cor_veiculo +"', '"+ ano +"', '"+ cidade_estado +"', '"+ bairro +"', '"+ rua +"', '"+ numero_casa +"', '"+ valor_mensalidade +"', '"+ situacao +"' )" 
        const query =  connection.query(sql, function(err, result, fields){
            if(err) throw new Error(err)


            callback(result)
            
        })

        console.log(query.CadastraCliente)
        connection.end()

    }
}


