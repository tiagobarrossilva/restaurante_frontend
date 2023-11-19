import styles from "../../pages/Garcom/VendasAbertas.module.css"

import { useState,useEffect } from "react"
import api from "../../../utils/api"

function VendasAbertas(){
    const [token] = useState(localStorage.getItem('token') || '')
    const [vendasAbertas,setVendasAbertas] = useState([])

    useEffect(() =>{
        api.get('/venda/abertas',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setVendasAbertas(response.data.vendas)
            console.log(vendasAbertas)
        })
    }, [token])

    return(
        <section className={styles.vendasAbertas}>
            <p>vendas abertas</p>
            {console.log(vendasAbertas)}

            <div className="VendasAbertas">
                {vendasAbertas.length > 0 &&
                    vendasAbertas.map((venda) =>(
                        <div key={venda.id}>
                            <p>Mesa: {venda._id}</p>                          
                           
                            <br/><br/>
                        </div>
                    ))
                }
                
                {vendasAbertas.length === 0 && <p>não ha vendas abertas</p>}
            </div>
        </section>
    )
}

export default VendasAbertas