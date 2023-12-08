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
            <div className={styles.ItensCardapio}>
                <h1>listagem itens cardapio</h1><br/>
                <p>{<Link to="/adicionar-ao-cardapio">Adicionar item ao cardapio</Link>}</p><br/>
                <div className="elementosPaginaItens">
                    <button onClick={selecionarTodos}>Todos</button>
                    <button onClick={()=> selecionarItens(1)}>Comidas</button>
                    <button onClick={()=> selecionarItens(2)}>Bebidas</button>
                    <button onClick={()=> selecionarItens(3)}>Sobremesas</button>
                    <button onClick={()=> selecionarItens(4)}>Diversos</button>
                </div>

                {modalExcluir &&
                    createPortal(
                        <ModalExcluir tipoModal='itens' exibirModalExcluir={exibirModalExcluir} nome={modalItem}  id={modalIdItem} excluir={excluir}/>,
                        document.body
                    )
                }

                <div >
                    {itens.length > 0 &&
                        itens.map((item) =>(
                            <div key={item.id}>
                                <p>Id: {item._id}</p>
                                <p>Nome: {item.nome}</p>
                                <p>Descrição: {item.descricao}</p>
                                <p>Preço: {item.preco}</p>
                                {item.tipo == 1 && <p>Comida</p>}
                                {item.tipo == 2 && <p>Bebida</p>}
                                {item.tipo == 3 && <p>Sobremesa</p>}
                                {item.tipo == 4 && <p>Diversos</p>}
                                <button ><Link to={`/editar-item/${item._id}/${item.nome}/${item.descricao}/${item.preco}/${item.tipo}`}>Editar</Link></button>
                                <button className={styles.botaoExcluir} onClick={()=>selecionarItemExcluir(item.nome,item._id)}>Excluir</button>
                                <br/><br/>
                            </div>
                        ))
                    }
                    
                    {itens.length === 0 && <p>não ha item cadastrado</p>}
                </div>
            </div>
        </section>
    )
}

export default ItensCardapio