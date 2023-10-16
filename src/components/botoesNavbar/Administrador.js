import styles from "./Administrador.module.css"
import { Link } from "react-router-dom"

function Administrador(){
    return(
        <>
            <li><Link to="/funcionarios">Funcionarios</Link></li>
            <li><Link to="/vendas">Vendas</Link></li>
            <li><Link to="/cardapio">Cardapio</Link></li>
        </>
    )
}

export default Administrador