import { Link } from "react-router-dom"
import Administrador from "../botoesNavbar/Administrador"
import Caixa from "../botoesNavbar/Caixa"

// necessario para usar contextos
import { useContext } from "react"

import styles from "./Navbar.module.css"
import logomarca from "../../assets/img/logo.png"

// contextos
import { Context } from "../../context/UserContext"

function Navbar(){
    const {authenticated, logout, usuarioLogado, homeUsuario} = useContext(Context)

    let usuarioAutenticado = {
        nome: '',
        tipo: ''
    }
      
    usuarioAutenticado = usuarioLogado()

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logomarca} alt=""/>
            </div>
            <ul>
                {authenticated ? (
                <>
                    <li onClick={homeUsuario}>Home</li>

                    {usuarioAutenticado.tipo == "Administrador" &&(
                        <Administrador/>
                    )}

                    {usuarioAutenticado.tipo == "Caixa" &&(
                        <Caixa/>
                    )}
                    <span>{usuarioAutenticado.tipo}</span>
                    <span>{usuarioAutenticado.nome}</span>
                    <li onClick={logout}>Sair</li>
                </>
                )
                :
                (
                <>
                    <li><Link to="/login">Entrar</Link></li>
                </>
                )
                }
            </ul>
        </nav>
    )
}

export default Navbar