import styles from "../../pages/Garcom/VendasFechadas.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import useFlashMessage from '../../../hooks/useFlashMessage'
import { Link } from "react-router-dom"

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

    async function reabrirVenda(idMesa){
        let msgType = 'success'
        const data = await api.patch(`/venda/reabrir-venda/${idMesa}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            const vendasAtualizadas = vendasFechadas.filter((venda)=> venda._id != idMesa)
            setVendasFechadas(vendasAtualizadas)
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.VendasFechadas}>
            <h1>Vendas fechadas</h1>

            <div className={styles.elementos}>
                {vendasFechadas.length > 0 &&
                    vendasFechadas.map((venda) =>(
                        <div key={venda.id} className={styles.PaginaItens}>
                            <p>Mesa: {venda._id}</p>

                            <p>
                                <Link to={`/detalhes-venda/${venda._id}`} className={styles.btnLink}>Exibir detalhes</Link>
                            </p>

                            <button onClick={()=> reabrirVenda(venda._id)} className={styles.btn}>Re-abrir venda</button>

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