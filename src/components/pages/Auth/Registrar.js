import {useContext, useState} from 'react'
import Input from "../../form/Input"
import styles from "../../form/Form.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function Registrar(){
    const [user, setUser] = useState({})

    const {registrar} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(user)
        // enviar o usuario para o banco
        registrar(user)
    }

    return(
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Id"
                    type="text"
                    name="id"
                    placeholder="Digite o id"
                    haldleOnChange={handleChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="nome"
                    placeholder="Digite o nome"
                    haldleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="senha"
                    placeholder="Digite a senha"
                    haldleOnChange={handleChange}
                />
                <Input
                    text="Tipo"
                    type="text"
                    name="tipo"
                    placeholder="Digite o tipo de usuario"
                    haldleOnChange={handleChange}
                />
                <input type="submit" value="cadastrar"/>
            </form>
        </section>
    )
}

export default Registrar