import styles from "../../pages/Cozinha/HomeCozinha.module.css"

import { Link } from "react-router-dom"

import { useState,useEffect } from "react"
import api from "../../../utils/api"


import useFlashMessage from "../../../hooks/useFlashMessage"

function HomeCozinha(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const [pedidos,setpedidos] = useState([])
    

    useEffect(() =>{
        api.get('/venda/agurdando-preparo',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setpedidos(response.data.pedidos)
        })
    }, [token])

    async function atualizarPedidos(){
        api.get('/venda/agurdando-preparo',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setpedidos(response.data.pedidos)
        })
    }

    async function confirmarPreparo(idMesa,idItem,quantidade){
        let msgType = 'success'
        const data = await api.patch(`/venda/confirmar-preparo/${idMesa}/${idItem}/${quantidade}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response)=>{
            atualizarPedidos()
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section>
            <div className={styles.HomeCozinha}>
                <h1>Home da cozinha</h1>
            </div>

            <div>
                {pedidos.length > 0 &&
                    pedidos.map((pedido) =>(
                        <div key={pedido.mesa}>                                                                
                            {pedido.pedidos.map((item) =>(
                                <div>
                                    <p>Mesa: {pedido.mesa}</p>
                                    <p>Item: {item.nome}</p>
                                    <p>Quantidade: {item.quantidade}</p>
                                    <button onClick={()=>confirmarPreparo(pedido.mesa,item._id,item.quantidade)}>Confirmar preparo</button>
                                    <br/><br/>
                                </div>
                            ))}                                                                                                                               
                        </div>
                    ))
                }

                {pedidos.length === 0 && <p>não ha item cadastrado</p>}
            </div>
        </section>
    )
}

export default HomeCozinha