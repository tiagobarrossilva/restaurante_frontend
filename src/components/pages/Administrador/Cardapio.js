import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

import Input from "../../form/Input"

import styles from "../../pages/Administrador/Cardapio.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function Cardapio(){
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
            <h2>Gerenciamento de Cardapio</h2>
            <p>{<Link to="/adicionar-ao-cardapio">Adicionar item ao cardapio</Link>}</p>

        </section>
    )

}

export default Cardapio