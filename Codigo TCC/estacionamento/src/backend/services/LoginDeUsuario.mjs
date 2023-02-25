import BancoParking from "../server.mjs"
 
  export  class LoginDeUsuario{

        static async handle(senha,email,callback){
           const connection = await BancoParking.connect()
           let sql = "select * from funcionario where email = ? and senha = '" + senha + "'"
           let query = connection.query(sql,email,function(err,results,fields){
            if(err) throw new Error(err)
            
            if(results.lenght == 0){
                throw new Error('Usário não encontrado!')
            }

            callback(results)

           })
           console.log(query.sql)
           connection.end()
    
        }
    } 

