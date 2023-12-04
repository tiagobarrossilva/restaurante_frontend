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


    useEffect(() =>{
        api.get(`/venda/pedido/${mesa}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setPedidos(response.data.vendas.pedidos)
        })
    }, [token])

    return(
        <section >
            <h1>Detalhes da mesa {mesa}</h1>
            <div >
                {pedidos.length > 0 &&
                    pedidos.map((pedido) =>(
                        <div key={pedido.id}>
                            <p>Codigo do item: {pedido._id}</p>
                            <p>Item: {pedido.nome}</p>
                            <p>Quantidade: {pedido.quantidade}</p>
                            {pedido.preparado == true && <p>Já foi preparado</p>}
                            {pedido.preparado == false && <p>Aguardando preparo</p>}
                            
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