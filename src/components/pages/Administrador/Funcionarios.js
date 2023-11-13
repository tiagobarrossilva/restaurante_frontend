import { Link } from "react-router-dom"
import styles from "../../pages/Administrador/Funcionarios.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"

import ModalExcluir from "../../modal/ModalExcluir"
import { createPortal } from 'react-dom'

function Funcionarios(){
    const [token] = useState(localStorage.getItem('token') || '')
    const [usuarios,setUsuarios] = useState([])
    const [usuarios2,setUsuarios2] = useState([])

    const [modalExcluir,setModalExcluir] = useState(false)
    

    useEffect(() =>{
        api.get('/usuario',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setUsuarios(response.data.usuarios)
            setUsuarios2(response.data.usuarios)
        })
    }, [token])

    function selecionarUsuarios(s){
            let usuariosSelecionados = []
            for(let i in usuarios2){
                if(usuarios2[i].tipo == s){
                    usuariosSelecionados.push(usuarios2[i])
                }
            }
            setUsuarios(usuariosSelecionados)
    }

    function selecionarTodos(){
            setUsuarios(usuarios2)
    }

    function exibirModalExcluir(){
        setModalExcluir(!modalExcluir)
    }

    return(
        <section className={styles.Funcionarios}>
            <h1>Gerenciamento de Funcionarios</h1>
            <p>{<Link to="/registrar">Cadastrar novo funcionario</Link>}</p>
            <div className="elementosPaginaItens">
                <button onClick={selecionarTodos}>Todos</button>
                <button onClick={()=> selecionarUsuarios(1)}>Administrador</button>
                <button onClick={()=> selecionarUsuarios(2)}>Garçon</button>
                <button onClick={()=> selecionarUsuarios(3)}>Caixa</button>
                <button onClick={()=> selecionarUsuarios(4)}>Cozinha</button>
            </div>

            {modalExcluir &&
                createPortal(
                    <ModalExcluir tipoModal='funcionarios' exibirModalExcluir={exibirModalExcluir}/>,
                    document.body
                )
            }

            <div className="elementosPaginaUsuarios">
                {usuarios.length > 0 &&
                    usuarios.map((usuario) =>(
                        <div key={usuario.id}>
                            <p>Id: {usuario._id}</p>
                            <p>Nome: {usuario.nome}</p>
                            {usuario.tipo == 1 && <p>Administrador</p>}
                            {usuario.tipo == 2 && <p>Garçon</p>}
                            {usuario.tipo == 3 && <p>Caixa</p>}
                            {usuario.tipo == 4 && <p>Cozinha</p>}
                            <button onClick={exibirModalExcluir}>Excluir</button>
                            <br/><br/>
                        </div>
                    ))
                }

                {usuarios.length === 0 && <p>não ha item cadastrado</p>}
            </div>

        </section>
    )
}

export default Funcionarios