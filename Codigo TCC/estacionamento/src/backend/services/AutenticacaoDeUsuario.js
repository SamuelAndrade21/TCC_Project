 import BancoParking from "../server";
 
 
 export class AutenticacaoDeUsuario{

        static AutenticacaoUser(callback){
           const connection = BancoParking.connection() 
           let sql = 'select email,senha from funcionario'
           let query = connection.query(sql,function(err,results,fields){
            if(err) throw new Error("Email/Senha inválido!")

            callback(results)

           })
           console.log(query.sql)
           connection.end()
        //    select * from cliente INSERT INTO `park`.`funcionario`
        //    (`funcionario_id`,
        //    `data_cadastro`,
        //    `nome`,
        //    `telefone`,
        //    `email`,
        //    `senha`,
        //    `imagem`)
        //    VALUES
        //    (<{funcionario_id: }>,
        //    <{data_cadastro: }>,
        //    <{nome: }>,
        //    <{telefone: }>,
        //    <{email: }>,
        //    <{senha: }>,
        //    <{imagem: }>);

        // } 
        }
        
         

 }


AutenticacaoDeUsuario.AutenticacaoUser((car)=>{
    console.log(car)
})
 //  let id = 20

//  CarroDB.getCarById(21,function(car){
//     return console.log(car)
//  })