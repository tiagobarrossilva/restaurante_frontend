import { Link } from "react-router-dom"

// necessario para usar contextos
import { useContext } from "react"

import styles from "./Navbar.module.css"

import logomarca from "../../assets/img/logomarca_pet.jpg"

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
                <img src={logomarca} alt="Get a Pet"/>
                <h2>Restaurante</h2>
            </div>
            <ul>
               
                
                {authenticated ? (
                <>
                <li onClick={homeUsuario}>Home</li>
                <li>{usuarioAutenticado.tipo}</li>
                <li>{usuarioAutenticado.nome}</li>
                <li onClick={logout}>Sair</li>
                </>
                )
                :
                (
                <>
                <li><Link to="/login">Entrar</Link></li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar