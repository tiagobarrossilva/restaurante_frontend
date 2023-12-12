import styles from "../../pages/Garcom/HomeGarcom.module.css"
import { Link } from "react-router-dom"

function HomeGarcom(){
    return(
        <section className={styles.HomeGarcom}>
            <h1>Home do garçom</h1>
            <div className={styles.centralizar}>
                <p>
                    <Link to={`/abrir-venda`} className={styles.btnOp}>Abrir venda</Link>
                </p>
                <p>
                    <Link to={`/vendas-abertas`} className={styles.btnOp}>Vendas abertas</Link>
                </p>
                <p>
                    <Link to={`/vendas-fechadas`} className={styles.btnOp}>Vendas finalizadas</Link>
                </p>
                <p>
                    <Link to={`/cardapio-garcom`} className={styles.btnOp}>Ver cardapio</Link>
                </p>
                
            </div>
        </section>
    )
}

export default HomeGarcom