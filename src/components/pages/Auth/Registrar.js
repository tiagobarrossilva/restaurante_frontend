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
                {/* <Input
                    text="Tipo"
                    type="text"
                    name="tipo"
                    placeholder="Digite o tipo de usuario"
                    haldleOnChange={handleChange}
                /> */}

                <label>Tipo:</label><br/>
                <select name={"tipo"} onChange={handleChange}>
                    <option defaultValue="0">...</option>
                    <option value="1">Administrador</option>
                    <option value="2">Garçon</option>
                    <option value="3">Caixa</option>
                    <option value="4">Cozinha</option>
                </select>
                <input type="submit" value="cadastrar"/>
            </form>
        </section>
    )
}

export default Registrar