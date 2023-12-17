import styles from "../../pages/Garcom/DetalhesVenda.module.css"
import { useParams, Link } from 'react-router-dom'
import { useState,useEffect } from "react"
import api from "../../../utils/api"

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function DetalhesVenda(){
    const {mesa} = useParams()
    const [token] = useState(localStorage.getItem('token') || '')
    const [pedidos,setPedidos] = useState([])
    const [venda,setVendas] = useState([])
    let precoTotal = 0


    useEffect(() =>{
        api.get(`/venda/pedido/${mesa}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setPedidos(response.data.vendas.pedidos)
            setVendas(response.data.vendas)
        })
    }, [token])

    return(
        <section >
            <h1>Detalhes da mesa {mesa}</h1>
            
            <div className={styles.elementos}>
                {pedidos.length > 0 &&
                    pedidos.map((pedido) =>(
                        <div key={pedido.id} className={styles.paginaItens}>

                            <h3>Situação: {venda.situacao}</h3>

                            <hr></hr>
                            <p>Codigo do item: {pedido._id}</p>
                            <hr></hr>
                            <p>Item: {pedido.nome}</p>
                            <hr></hr>
                            <p>Quantidade: {pedido.quantidade}</p>
                            <hr></hr>
                            <p>Preco unitario: {pedido.preco}</p>
                            <hr></hr>
                            {pedido.preparado == true && <p>Já foi preparado</p>}
                            {pedido.preparado == false && <p>Aguardando preparo</p>}
                            
                            <div className={styles.calculoPreco}>
                                {precoTotal = (pedido.preco * pedido.quantidade) + precoTotal}
                            </div>
                            
                            <h4>Preço total: {precoTotal}</h4>
                            <br/><br/>
                        </div>
                    ))
                    
                }
                
                {pedidos.length === 0 && <p>Sem pedidos</p>}
            </div>
            
        </section>
    )
}

export default DetalhesVenda