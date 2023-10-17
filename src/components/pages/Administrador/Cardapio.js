import { Link } from "react-router-dom"
import styles from "../../pages/Administrador/Cardapio.module.css"

function Cardapio(){
    return(
        <section className={styles.form_container}>
            <h3>Gerenciamento de Cardapio</h3>
            <p>{<Link to="/adicionar-ao-cardapio">Adicionar item ao cardapio</Link>}</p>
        </section>
    )
}

export default Cardapio