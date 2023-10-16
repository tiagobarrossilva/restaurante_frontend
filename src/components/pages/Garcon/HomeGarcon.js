import {useContext, useState} from 'react'

import Input from "../../form/Input"

import styles from "../../pages/Garcon/HomeGarcon.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function HomeGarcon(){
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
            <h1>Home do garçon</h1>
            <div>
                <button type="button">Vendas abertas</button>
                <button type="button">Abrir vendas</button>
                <button type="button">Adicionar produto a venda</button>
            </div>
                
        </section>
    )

}

export default HomeGarcon