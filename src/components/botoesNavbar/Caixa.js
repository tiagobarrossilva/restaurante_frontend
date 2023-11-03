import styles from "./Caixa.module.css"
import { Link } from "react-router-dom"

function Caixa(){
    return(
        <div className={styles.Caixa}>
            <li><Link to="/teste-caixa">Icones do caixa</Link></li>
        </div>
    )
}

export default Caixa