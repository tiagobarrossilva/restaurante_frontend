import styles from "./Administrador.module.css"
import { Link } from "react-router-dom"

function Administrador(){
    return(
        <div className={styles.conf}>
            <li><Link to="/funcionarios">Funcionarios</Link></li>
            <li><Link to="/vendas">Vendas</Link></li>
            <li><Link to="/itens-cardapio">Cardapio</Link></li>
        </div>
    )
}

export default Administrador