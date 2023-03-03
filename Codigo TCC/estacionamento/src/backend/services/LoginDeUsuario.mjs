import BancoParking from "../server.mjs"

 
  export  class LoginDeUsuario{

        static async handle(senha,email,callback){
           const connection = await BancoParking.connect()
           let sql = "select funcionario_id,nome,email,senha from funcionario where email = ? and senha = ?"
           let query = connection.query(sql,[email,senha],function(err,results,fields){
            if(err) throw new Error(err)
            
            if (results.length === 0) {
                const error = console.log("Email/Senha inválido!")
                callback(error);
                return;
              }

          
              callback(results)
             

           })
           console.log(query.sql)
           connection.end()
    
        }
    } 

