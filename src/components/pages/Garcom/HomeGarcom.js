import styles from "../../pages/Garcom/HomeGarcom.module.css"
import { Link } from "react-router-dom"

function HomeGarcom(){
    return(
        <section className={styles.HomeGarcom}>
            <h1>Home do garçom</h1>
            <div>
                <button ><Link to={`/abrir-venda`}>Abrir venda</Link></button>
                <button ><Link to={`/vendas-abertas`}>Vendas abertas</Link></button>
                <button ><Link to={`/vendas-fechadas`}>Vendas finalizadas</Link></button>
                <button ><Link to={`/cardapio-garcom`}>Ver cardapio</Link></button>
                
            </div>
        </section>
    )
}

export default HomeGarcom