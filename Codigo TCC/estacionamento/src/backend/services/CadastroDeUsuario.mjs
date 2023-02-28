import BancoParking from "../server.mjs"

 
  export  class CadastroDeUsuario{

        static async handle(nome,telefone,email,senha,callback){
           const connection = await BancoParking.connect()
           let sql = "insert into funcionario (nome,telefone,email,senha) values ( '"+ nome +"', '"+ telefone +"', '"+ email +"', '"+ senha +"')"
           let query =  connection.query(sql,function(err,results,fields){
            if(err) throw new Error(err)

            callback(results)
               
           })

           console.log(query.sql)
           connection.end()
    
        }
    } 
