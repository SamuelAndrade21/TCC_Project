import BancoParking from "../server.mjs";


export class AutenticacaoHash{
   static async handle(email,callback){
       let connection = await BancoParking.connect() 
       const sql = "select senha,nome from funcionario where email = '" + email + "'"
       let query = connection.query(sql,function(err,results,fields){
        if(err) throw new Error ("Email não existe animal!")

           callback(results)
        

       })

       console.log(query.sql)
       connection.end()
    }

}

