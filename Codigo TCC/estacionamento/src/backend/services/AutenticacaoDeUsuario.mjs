import BancoParking from "../server.mjs"
 
  class AutenticacaoDeUsuario extends BancoParking{

        static AutenticacaoUser(callback){
           const connection = BancoParking.connect() 
           let sql = 'select nome,email,senha from funcionario'
           let query = connection.query(sql,function(err,results,fields){
            if(err) throw new Error(err)

            callback(results)

           })
           console.log(query.sql)
           connection.end()
    
        }
    }

AutenticacaoDeUsuario.AutenticacaoUser((cars)=>{
    cars.map(car =>{
        console.log(car )
    })
})
 