import api from "../utils/api"
import { useEffect } from "react"

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useItem(){

    // necessario para mudar a pagina
    const navigate = useNavigate();

    // flash message
    const {setFlashMessage} = useFlashMessage()

    // enviar o token se houver, quando o usuario acessar alguma pagina
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
    },[])
    
    async function adicionarItem(item){
        try{
            await api.post('/item',item).then((response) =>{
            return response.data
            })
            navigate('/home-administrador')
            setFlashMessage('Item adicionado com sucesso', 'success')
        } catch(error){
            setFlashMessage(error.response.data.message, 'error')
        }
    }

    async function consultarItens(){
        try{
            const itens = await api.get('/item').then((response) =>{
                return response.data.itens
            })
            return itens
        } catch(error){
            setFlashMessage(error.response.data.message, 'error')
        }
    }

    return {adicionarItem, consultarItens}
}