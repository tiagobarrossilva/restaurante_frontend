import styles from "../../pages/Garcom/AdicionarItemVenda.module.css"
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import { createPortal } from 'react-dom'
import ModalVerificarItens from "../../modal/ModalVerificarItens"

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function AdicionarItemVenda(){
    const {mesa} = useParams()
    const [itens,setItem] = useState([])
    const [itens2,setItem2] = useState([])
    const [listaAdicionados, setListaAdicionados] = useState([])
    const [modalVerificarItens,setModalVerificarItens] = useState(false)
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();

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
        let itensSelecionados = []
        for(let i in itens2){
            if(itens2[i].tipo == s){
                itensSelecionados.push(itens2[i])
            }
        }
        setItem(itensSelecionados)
    }

    function selecionarTodos(){
        setItem(itens2)
    }

    function adicionarItem(id, nome, preco){
        const quantidade = document.querySelector('#quantidade'+id).value
        const itemAdicionado = {id, quantidade, nome, preco}
        
        const itensAtualizados = [...listaAdicionados,itemAdicionado]
        setListaAdicionados(itensAtualizados)
        
        const input = document.querySelector('#quantidade'+id)
        input.value = "1"
        setFlashMessage('Adicionado: '+nome+' , '+'Quantidade: '+quantidade,'success')
    }

    function verificar(){
        console.log(listaAdicionados)
        exibirModal()
    }

    function limparSelecao(){
        if(listaAdicionados.length == 0){
            setFlashMessage('Não ha itens selecionados','error')
        } else{
            setListaAdicionados([])
            setFlashMessage('Seleção de itens excluida','success')
        }
    }

    function exibirModal(){
        setModalVerificarItens(true)
    }

    function ocultarModal(){
        setModalVerificarItens(false)
    }

    async function efetuarPedido(pedido){
        let msgType = 'success'
        const data = await api.patch(`/venda/pedido/${mesa}`,pedido,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            navigate('/home-garcom')
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.AdicionarItemVenda}>

            {modalVerificarItens &&
                createPortal(
                    <ModalVerificarItens efetuarPedido={efetuarPedido} exibirModal={exibirModal} ocultarModal={ocultarModal} listaAdicionados={listaAdicionados} setListaAdicionados={setListaAdicionados}/>,
                    document.body
                )
            }

            <h1>Adicionar item a mesa: {mesa}</h1>
            <div>
                <button onClick={verificar} className={styles.btnOp}>verificar</button>
                <button onClick={limparSelecao} className={styles.btnOp}>Limpar seleção</button>
            </div>

            <div className={styles.s}>
                <h2>Cardapio <hr></hr></h2>

                <button onClick={selecionarTodos} className={styles.btnOp}>Todos</button>
                <button onClick={()=> selecionarItens(1)} className={styles.btnOp}>Comidas</button>
                <button onClick={()=> selecionarItens(2)} className={styles.btnOp}>Bebidas</button>
                <button onClick={()=> selecionarItens(3)} className={styles.btnOp}>Sobremesas</button>
                <button onClick={()=> selecionarItens(4)} className={styles.btnOp}>Diversos</button>
            </div>

            <div className={styles.elementosPagina}>
                {itens.length > 0 &&
                    itens.map((item) =>(
                        <div key={item.id} className={styles.PaginaVenda}>
                            <p>Id: {item._id}</p>
                            <p>Nome: {item.nome}</p>
                            <p>Descrição: {item.descricao}</p>
                            <p>Preço: {item.preco}</p>
                            {item.tipo == 1 && <p>Comida</p>}
                            {item.tipo == 2 && <p>Bebida</p>}
                            {item.tipo == 3 && <p>Sobremesa</p>}
                            {item.tipo == 4 && <p>Diversos</p>}
                            <div>
                                <label>Quantidade: </label>
                                <input id={'quantidade'+item._id} placeholder="Quantidade" type="number" defaultValue={1} className={styles.label}/>
                                <button onClick={()=> adicionarItem(item._id, item.nome, item.preco)} className={styles.btnAdd}>Adicionar</button>
                                <br/><br/>
                            </div>
                        </div>
                    ))
                }
                
                {itens.length === 0 && <p>não ha item cadastrado</p>}
            </div>
        </section>
    )
}

export default AdicionarItemVenda