import { Link } from "react-router-dom"
import styles from "../../pages/Administrador/Funcionarios.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import useFlashMessage from "../../../hooks/useFlashMessage"

import ModalExcluir from "../../modal/ModalExcluir"
import { createPortal } from 'react-dom'

function Funcionarios(){
    const [token] = useState(localStorage.getItem('token') || '')
    const [usuarios,setUsuarios] = useState([])
    const [usuarios2,setUsuarios2] = useState([])
    const {setFlashMessage} = useFlashMessage()

    const [modalExcluir,setModalExcluir] = useState(false)
    const [modalUsuario,setModalUsuario] = useState('')
    const [modalIdUsuario,setModalIdUsuario] = useState('')

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

    function selecionarFuncionarioExcluir(nome,id){
            setModalUsuario(nome)
            setModalIdUsuario(id)
            exibirModalExcluir()
    }

    async function excluir(id){
        let msgType = 'success'
        const data = await api.delete(`/usuario/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response)=>{
            const usuariosAtualizados = usuarios2.filter((usuario)=> usuario._id != id)
            setUsuarios(usuariosAtualizados)
            setUsuarios2(usuariosAtualizados)
            setModalExcluir(false)
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.Funcionarios}>

            <h1 className={styles.title}>GERENCIAMENTO DE FUNCIONARIOS</h1>

            <p>{<Link to="/registrar" className={styles.btnAdd}>+Cadastrar novo funcionario</Link>}</p>

            <div className="elementosPaginaItens">
                <button onClick={selecionarTodos} className={styles.btnOp}>Todos</button>
                <button onClick={()=> selecionarUsuarios(1)} className={styles.btnOp}>Administrador</button>
                <button onClick={()=> selecionarUsuarios(2)} className={styles.btnOp}>Garçon</button>
                <button onClick={()=> selecionarUsuarios(3)} className={styles.btnOp}>Caixa</button>
                <button onClick={()=> selecionarUsuarios(4)} className={styles.btnOp}>Cozinha</button>
            </div>

            {modalExcluir &&
                createPortal(
                    <ModalExcluir tipoModal='funcionarios' exibirModalExcluir={exibirModalExcluir} nome={modalUsuario}  id={modalIdUsuario} excluir={excluir}/>,
                    document.body
                )
            }

            <div className={styles.elementosPaginaItens}>
                {usuarios.length > 0 &&
                    usuarios.map((usuario) =>(
                        <div key={usuario.id} className={styles.PaginaItens}>
                            <p>Id: {usuario._id}</p>
                            <p>Nome: {usuario.nome}</p>
                            {usuario.tipo == 1 && <p>Administrador</p>}
                            {usuario.tipo == 2 && <p>Garçom</p>}
                            {usuario.tipo == 3 && <p>Caixa</p>}
                            {usuario.tipo == 4 && <p>Cozinha</p>}
                            
                            <div className={styles.btnS}>
                                <button>
                                    <Link to={`/editar-funcionario/${usuario._id}/${usuario.nome}/${usuario.tipo}`} className={styles.btnEditar}>Editar</Link>
                                </button>
                            
                                <button onClick={()=>selecionarFuncionarioExcluir(usuario.nome,usuario._id)} className={styles.btnExcluir}>Excluir</button>
                            </div>
                            
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