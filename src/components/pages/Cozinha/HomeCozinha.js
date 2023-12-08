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

    return(
        <section>
            <div className={styles.HomeCozinha}>
                <h1>Home da cozinha</h1>
                {console.log(pedidos)}
            </div>

            <div >
                    {pedidos.length > 0 &&
                        pedidos.map((pedido) =>(
                            <div key={pedido.mesa}>
                                <p>Mesa: {pedido.mesa}</p>

                                {/* fazendo testes */}
                                {/* <p>Pedidos: {pedido.pedidos[0].nome}</p> */}
                               
                                
                                
                                <br/><br/>
                            </div>
                        ))
                    }
                    
                    {pedidos.length === 0 && <p>não ha item cadastrado</p>}
                </div>
        </section>
    )
}

export default HomeCozinha