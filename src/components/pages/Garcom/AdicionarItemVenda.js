import styles from "../../pages/Garcom/AdicionarItemVenda.module.css"
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import { createPortal } from 'react-dom'
import ModalVerificarItens from "../../modal/ModalVerificarItens"

function AdicionarItemVenda(){
    const {mesa} = useParams()
    const [itens,setItem] = useState([])
    const [itens2,setItem2] = useState([])
    const [listaAdicionados, setListaAdicionados] = useState([])
    const [modalVerificarItens,setModalVerificarItens] = useState(false)
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
        console.log(listaAdicionados.length)
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

    return(
        <section className={styles.AdicionarItemVenda}>

            {modalVerificarItens &&
                createPortal(
                    <ModalVerificarItens ocultarModal={ocultarModal} listaAdicionados={listaAdicionados} setListaAdicionados={setListaAdicionados}/>,
                    document.body
                )
            }

            <h1>Adicionar item a mesa: {mesa}</h1>
            <div>
                <button onClick={verificar}>verificar</button>
                <button onClick={limparSelecao}>Limpar seleção</button>
            </div>

            
            <div>
                <h2>Cardapio</h2>
                <button onClick={selecionarTodos}>Todos</button>
                <button onClick={()=> selecionarItens(1)}>Comidas</button>
                <button onClick={()=> selecionarItens(2)}>Bebidas</button>
                <button onClick={()=> selecionarItens(3)}>Sobremesas</button>
                <button onClick={()=> selecionarItens(4)}>Diversos</button>
            </div>

            <div>
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
                            <div>
                                <label>Quantidade</label>
                                <input id={'quantidade'+item._id} placeholder="Quantidade" type="number" defaultValue={1}/>
                                <button onClick={()=> adicionarItem(item._id, item.nome, item.preco)}>Adicionar</button>
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