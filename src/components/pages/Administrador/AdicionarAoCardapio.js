import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

import Input from "../../form/Input"

import styles from "../../pages/Administrador/AdicionarAoCardapio.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function AdicionarAoCardapio(){
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
            <p>formulario para adicionar item ao cardapio</p>
        </section>
    )

}

export default AdicionarAoCardapio