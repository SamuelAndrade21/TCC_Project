import BancoParking from "../../server.mjs";
import { promisify } from "util";

export class UpandoSenha{
    static async handle(funcionario_id,senha){
        const connection = await BancoParking.connect()
        const sql = "UPDATE funcionario SET senha = '" + senha + "' WHERE funcionario_id = '" + funcionario_id + "'"
        const query = promisify(connection.query).bind(connection)
        const results = await query(sql)

        if(results.length === 0){
            throw new Error("Funcionário não encontrado")
        }

        return results
    }

    static handleWithCallback(funcionario_id,senha,callback){
        this.handle(funcionario_id,senha)
        .then((results) => callback(results))
        .catch((err) => callback(err))
    }
}