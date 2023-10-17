import {useContext, useState} from 'react'
import Input from "../../form/Input"
import styles from "../../form/Form.module.css"

// contextos
import { Context } from '../../../context/UserContext'

function Login(){
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
            <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        text="Id"
                        type="text"
                        name="id"
                        placeholder="Digite o seu id"
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Senha"
                        type="password"
                        name="senha"
                        placeholder="Digite a sua senha"
                        haldleOnChange={handleChange}
                    />
                    <input type="submit" value="Entrar"/>
                </form>
        </section>
    )
}

export default Login