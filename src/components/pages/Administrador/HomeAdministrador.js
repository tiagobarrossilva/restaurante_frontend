import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

import Input from "../../form/Input"

import styles from "../../pages/Administrador/HomeAdministrador.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function HomeAdministrador(){
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        login(user)
    }

    return(
        <section className={styles.form_container}>
            <h1>Home do adm</h1>
            {/* <p>{<Link to="/registrar">Cadastrar novo usuario</Link>}</p> */}
            <p>{<Link to="/funcionarios">Funcionarios</Link>}</p>
            <p>{<Link to="/vendas">Vendas</Link>}</p>
            <p>{<Link to="/cardapio">Cardapio</Link>}</p>
            
            

        </section>
    )

}

export default HomeAdministrador