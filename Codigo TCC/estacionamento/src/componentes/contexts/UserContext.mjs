import { createContext,useState,useEffect } from "react";
import { destroyCookie,setCookie,parseCookies } from "nookies";
import { api } from "../apiClient.mjs";

export const ContextUser = createContext()

export function AuthProvider(ctx,children){

    if(!ctx){
        console.log("Erro seu otário")
    }
const cookies = parseCookies(ctx)
setCookie(null, '@react.token',cookies,{
    maxAge:60 * 60 * 60 * 24 * 30,
    path:'/'
})

api.defaults.headers['Authorization'] = `Bearer ${cookies}`


return(
    <ContextUser.Provider value={ctx}>
        {children}
    </ContextUser.Provider>
)
}