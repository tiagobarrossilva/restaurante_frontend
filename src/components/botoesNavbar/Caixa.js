import styles from "./Caixa.module.css"
import { Link } from "react-router-dom"

function Caixa(){
    return(
        <div className={styles.Caixa}>
            <li><Link to="/receber-pagamento">Receber pagamento</Link></li>
        </div>
    )
}

export default Caixa