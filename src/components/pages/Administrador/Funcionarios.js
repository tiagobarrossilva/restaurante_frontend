import { Link } from "react-router-dom"
import styles from "../../pages/Administrador/Funcionarios.module.css"

function Funcionarios(){
    return(
        <section className={styles.form_container}>
            <h1>Gerenciamento de Funcionarios</h1>
            <p>{<Link to="/registrar">Cadastrar novo funcionario</Link>}</p>
        </section>
    )
}

export default Funcionarios