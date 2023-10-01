import { createContext } from "react"

import useAuth from "../hooks/useAuth"

const Context = createContext()

function UserProvider({children}){
    // authenticated, serve para saber a situação da autenticação
    const {authenticated,registrar,logout, login, usuarioLogado, homeUsuario} = useAuth()

    return <Context.Provider value={{authenticated,registrar,logout, login, usuarioLogado, homeUsuario}}>{children}</Context.Provider>
}

export {Context,UserProvider}