import BancoParking from "../server.mjs"

 
  export  class LoginDeUsuario{

        static async handle(email,callback){
           const connection = await BancoParking.connect()
<<<<<<< Updated upstream
           let sql = "select funcionario_id,nome,email from funcionario where email = ?"
           let query = connection.query(sql,email,function(err,results,fields){
=======
           let sql = "select funcionario_id,nome,email,telefone,imagem,data_cadastro from funcionario where email = '" + email +"'"
           let query = connection.query(sql,function(err,results,fields){
>>>>>>> Stashed changes
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

