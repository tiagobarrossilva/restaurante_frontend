import api from "../utils/api"

import { useState, useEffect } from "react"

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

import useFlashMessage from './useFlashMessage'

export default function itemCardapio(){
    // autenticação
    const [authenticated, setAuthenticated] = useState(false)

    // necessario para mudar a pagina
    const navigate = useNavigate();

    // flash message
    const {setFlashMessage} = useFlashMessage()

    // enviar o token se houver, quando o usuario acessar alguma pagina
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    },[])

    async function cadastrarItem(item){
        try{
            await api.post('/cardapio/adicionar',item).then((response) =>{
            return response.data
            })
            navigate('/home-administrador')
            setFlashMessage('Item adicionado ao cardapio', 'success')
        } catch(error){
            setFlashMessage(error.response.data.message, 'error')
        }
    }

    return {authenticated, cadastrarItem}
}