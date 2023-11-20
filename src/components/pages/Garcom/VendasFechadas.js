import styles from "../../pages/Garcom/VendasFechadas.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import useFlashMessage from '../../../hooks/useFlashMessage'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function VendasFechadas(){
    const [token] = useState(localStorage.getItem('token') || '')
    const [vendasFechadas,setVendasFechadas] = useState([])
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();

    useEffect(() =>{
        api.get('/venda/fechadas',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setVendasFechadas(response.data.vendas)
        })
    }, [token])

    return(
        <section className={styles.VendasFechadas}>
            <h1>Vendas fechadas</h1>

            <div className="VendasFechadas">
                {vendasFechadas.length > 0 &&
                    vendasFechadas.map((venda) =>(
                        <div key={venda.id}>
                            <p>Mesa: {venda._id}</p>
                            <button type="button">Exibir detalhes</button>
                            {/* <button onClick={()=>fecharVenda(venda._id)}>Fechar venda</button> */}
                            <br/><br/>
                        </div>
                    ))
                }
                
                {vendasFechadas.length === 0 && <p>não ha vendas fechadas</p>}
            </div>
        </section>
    )
}

export default VendasFechadas