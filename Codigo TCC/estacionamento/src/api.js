import axios, {AxiosError} from 'axios'

export function setupAPIClient( ){


const api = axios.create({
    baseURL: 'http://localhost:3333',
    responseType: 'json'
    // headers:{
    //     Authorization: `Bearer ${cookies['@nextauth.token']}`
    // }
})

    api.interceptors.response.use(response =>{
        return response
    },(err = AxiosError) =>{
            if(err.response.status === 401){
                //Chamar a função para deslogar o usuário
              
              
            } if(typeof window !== undefined){
             
            }else{
                //método que retorna um erro em um Token Inválido
                return Promise.reject()
            }

            return Promise.reject(err)

        })

        return api;

}