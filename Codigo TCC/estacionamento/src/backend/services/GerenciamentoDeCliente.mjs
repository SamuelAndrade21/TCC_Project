import BancoParking from "../server.mjs";

export class CadastroDeCliente{
    
    static async handle(nome, celular, email, cpf, veiculo, placa, valorMensal, callback){
        const connection = await BancoParking.connect()

        let CadastraCliente = "INSERT INTO CLIENTE (nome, celular, email, cpf, veiculo, placa, valorMensal) values ( '"+ nome +"', '"+ celular+"', '"+ email +"', '"+ cpf +"', '"+ veiculo +"', '"+ placa +"', '"+ valorMensal+"' )"
        
        let query = await connection.query(CadastraCliente, function(err, result, fields){
            if(err) throw new Error(err)


            callback(result)
            
        })

    }
}



