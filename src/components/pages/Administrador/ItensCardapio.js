import { Link } from "react-router-dom"
import styles from "../../pages/Administrador/ItensCardapio.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import ModalExcluir from "../../modal/ModalExcluir"
import { createPortal } from 'react-dom'
import useFlashMessage from "../../../hooks/useFlashMessage"

function ItensCardapio(){
    const [itens,setItem] = useState([])
    const [itens2,setItem2] = useState([])
    const [modalExcluir,setModalExcluir] = useState(false)
    const [modalItem,setModalItem] = useState('')
    const [modalIdItem,setModalIdItem] = useState('')
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    
    useEffect(() =>{
        api.get('/item',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setItem(response.data.itens)
            setItem2(response.data.itens)
        })
    }, [token])

    function selecionarItens(s){
        if(!modalExcluir){
            let itensSelecionados = []
            for(let i in itens2){
                if(itens2[i].tipo == s){
                    itensSelecionados.push(itens2[i])
                }
            }
            setItem(itensSelecionados)
        }
    }

    function selecionarTodos(){
        if(!modalExcluir){
            setItem(itens2)
        }
    }

    function exibirModalExcluir(){
        setModalExcluir(!modalExcluir)
    }

    function selecionarItemExcluir(nome,id){
        if(!modalExcluir){
            setModalItem(nome)
            setModalIdItem(id)
            exibirModalExcluir()
        }
    }

    async function excluir(id){
        let msgType = 'success'
        const data = await api.delete(`/item/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response)=>{
            const itensAtualizados = itens2.filter((item)=> item._id != id)
            setItem(itensAtualizados)
            setItem2(itensAtualizados)
            setModalExcluir(false)
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }
    
    return(
        <section>
            <h1 className={styles.title}>LISTAGEM ITENS CARDAPIO</h1><br/>

            <p>
                <Link to="/adicionar-ao-cardapio" className={styles.btnAdd}>+Add ao cardápio</Link>
            </p>

            <div>
                <button onClick={selecionarTodos} className={styles.btnOp}>Todos</button>
                <button onClick={()=> selecionarItens(1)} className={styles.btnOp}>Comidas</button>
                <button onClick={()=> selecionarItens(2)} className={styles.btnOp}>Bebidas</button>
                <button onClick={()=> selecionarItens(3)} className={styles.btnOp}>Sobremesas</button>
                <button onClick={()=> selecionarItens(4)} className={styles.btnOp}>Diversos</button>
            </div>

            {modalExcluir &&
                createPortal(
                    <ModalExcluir tipoModal='itens' exibirModalExcluir={exibirModalExcluir} nome={modalItem}  id={modalIdItem} excluir={excluir}/>,
                    document.body
                )
            }

            <div className={styles.elementosPaginaItens}>
                {itens.length > 0 &&
                    itens.map((item) =>(
                        <div key={item.id} className={styles.PaginaItens}>
                            <p>Id: {item._id}</p>
                            <p>Nome: {item.nome}</p>
                            <p>Descrição: {item.descricao}</p>
                            <p>Preço: {item.preco}</p>
                            {item.tipo == 1 && <p>Comida</p>}
                            {item.tipo == 2 && <p>Bebida</p>}
                            {item.tipo == 3 && <p>Sobremesa</p>}
                            {item.tipo == 4 && <p>Diversos</p>}

                            <div className={styles.btnS}>
                                <button>
                                    <Link to={`/editar-item/${item._id}/${item.nome}/${item.descricao}/${item.preco}/${item.tipo}`} className={styles.btnEditar}>Editar</Link>
                                </button>
                            
                                <button onClick={()=>selecionarItemExcluir(item.nome,item._id)} className={styles.btnExcluir}>Excluir</button>
                            </div>

                            <br/><br/>
                        </div>
                    ))
                }
                
                {itens.length === 0 && <p>não ha item cadastrado</p>}
            </div>
        </section>
    )
}

export default ItensCardapio