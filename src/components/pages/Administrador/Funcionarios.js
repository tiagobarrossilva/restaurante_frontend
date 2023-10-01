import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

import Input from "../../form/Input"

import styles from "../../pages/Administrador/Funcionarios.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function Funcionarios(){
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
            <h2>Gerenciamento de Funcionarios</h2>
            <p>{<Link to="/registrar">Cadastrar novo funcionario</Link>}</p>

        </section>
    )

}

export default Funcionarios