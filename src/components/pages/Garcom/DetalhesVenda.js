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
            <h3>Situação: {venda.situacao}</h3>
            
            <div >
                {pedidos.length > 0 &&
                    pedidos.map((pedido) =>(
                        <div key={pedido.id}>
                            <p>Codigo do item: {pedido._id}</p>
                            <p>Item: {pedido.nome}</p>
                            <p>Quantidade: {pedido.quantidade}</p>
                            <p>Preco unitario: {pedido.preco}</p>
                            {pedido.preparado == true && <p>Já foi preparado</p>}
                            {pedido.preparado == false && <p>Aguardando preparo</p>}

                            <div className={styles.calculoPreco}>
                                {precoTotal = (pedido.preco * pedido.quantidade) + precoTotal}
                            </div>
                            
                            <br/><br/>
                        </div>
                    ))
                    
                }
                
                {pedidos.length === 0 && <p>Sem pedidos</p>}
            </div>
            <h4>Preço total: {precoTotal}</h4>
        </section>
    )
}

export default DetalhesVenda