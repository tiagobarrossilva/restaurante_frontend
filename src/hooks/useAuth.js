import api from "../utils/api"
import { useState, useEffect } from "react"

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){
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

    async function registrar(usuario){
        try{
            await api.post('/usuario/adicionar',usuario).then((response) =>{
            return response.data
            })
            navigate('/home-administrador')
            setFlashMessage('Cadastro realizado com sucesso', 'success')
        } catch(error){
            setFlashMessage(error.response.data.message, 'error')
        }
    }

    async function authUser(data){
        setAuthenticated(true)

        // armazenando o token e outras informações no navegador
        localStorage.setItem('token',JSON.stringify(data.token))
        localStorage.setItem('tipo',JSON.stringify(data.tipo))
        localStorage.setItem('nome',JSON.stringify(data.nome))

        if(data.tipo === 1){
            navigate('/home-administrador')
        } else if(data.tipo === 2){
            navigate('/home-garcon')
        } else if(data.tipo === 3){
            navigate('/home-caixa')
        } else if(data.tipo === 4){
            navigate('/home-cozinha')
        }
    }

    async function logout(){
        setAuthenticated(false)
        api.defaults.headers.Authorization = undefined
        localStorage.removeItem('token')
        localStorage.removeItem('tipo')
        localStorage.removeItem('nome')
        navigate('/')
        setFlashMessage('Logout realizado com sucesso','success')
    }

    async function login(user){
        try{
            const data = await api.post('/usuario/logar',user).then((response) => {
            return response.data
            })
            await authUser(data)
            setFlashMessage('Login realizado, bem vindo','success')
        } catch(error){
            setFlashMessage(error.response.data.message,'error')
        }
    }

    // acessar a pagina home do usuario de acordo com o tipo de usuario
    function homeUsuario(){
        const tipoUsuario = localStorage.getItem('tipo')

        if(tipoUsuario == 1){
            navigate('/home-administrador')
        } else if(tipoUsuario == 2){
            navigate('/home-garcon')
        } else if(tipoUsuario == 3){
            navigate('/home-caixa')
        } else if(tipoUsuario == 4){
            navigate('/home-cozinha')
        } else{
            setAuthenticated(false)
            api.defaults.headers.Authorization = undefined
            localStorage.removeItem('token')
            localStorage.removeItem('tipo')
            localStorage.removeItem('nome')
            navigate('/')
        }
    }

    // verificar nome e tipo de usuario logado
    function usuarioLogado(){
        let nomeUsuario = localStorage.getItem('nome')
        let tipoUsuario = localStorage.getItem('tipo')

        if(nomeUsuario && tipoUsuario){
            nomeUsuario = nomeUsuario.replace('"','',)
            nomeUsuario = nomeUsuario.replace('"','',)
            if(tipoUsuario == 1){
                tipoUsuario = 'Administrador'
            } else if(tipoUsuario == 2){
                tipoUsuario = 'Garçon'
            } else if(tipoUsuario == 3){
                tipoUsuario = 'Caixa'
            } else if(tipoUsuario == 4){
                tipoUsuario = 'Cozinha'
            }

            const usuarioLogado = {
                nome: nomeUsuario,
                tipo: tipoUsuario
            }

            return usuarioLogado
        } else{
            const usuarioLogado = {
                nome: '',
                tipo: ''
            }

            return usuarioLogado
        }
    }

    return {authenticated, registrar, logout, login, usuarioLogado, homeUsuario}
}