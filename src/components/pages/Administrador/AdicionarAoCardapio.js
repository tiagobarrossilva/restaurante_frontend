import {useContext, useState} from 'react'
import { Link } from "react-router-dom"

import Input from "../../form/Input"

import styles from "../../pages/Administrador/AdicionarAoCardapio.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function AdicionarAoCardapio(){
    // const [user, setUser] = useState({})
    // const {login} = useContext(Context)

    // function handleChange(e){
    //     setUser({...user, [e.target.name]: e.target.value})
    // }

    function handleSubmit(e){
        e.preventDefault()
        // login(user)
        console.log('testando')
    }

    return(
        <section className={styles.form_container}>
            <p>formulario para adicionar item ao cardapio</p>

            <form onSubmit={handleSubmit}>
                <Input
                    text="Id"
                    type="Number"
                    name="id"
                    placeholder="Digite o id"
                    // haldleOnChange={handleChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="nome"
                    placeholder="Digite o nome"
                    // haldleOnChange={handleChange}
                />
                <Input
                    text="Descrição"
                    type="text"
                    name="descricao"
                    placeholder="Digite a descrição"
                    // haldleOnChange={handleChange}
                />
                <Input
                    text="Preço"
                    type="Number"
                    name="preco"
                    placeholder="Digite o preço"
                    // haldleOnChange={handleChange}
                />
                <Input
                    text="Tipo"
                    type="Number"
                    name="tipo"
                    placeholder="Digite o tipo"
                    // haldleOnChange={handleChange}
                />
                <input type="submit" value="Adicionar item ao cardapio"/>
            </form>

        </section>
    )

}

export default AdicionarAoCardapio