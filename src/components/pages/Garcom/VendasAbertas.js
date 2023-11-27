import styles from "../../pages/Garcom/VendasAbertas.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"
import useFlashMessage from '../../../hooks/useFlashMessage'
import { Link } from "react-router-dom"

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function VendasAbertas(){
    const [token] = useState(localStorage.getItem('token') || '')
    const [vendasAbertas,setVendasAbertas] = useState([])
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();

    useEffect(() =>{
        api.get('/venda/abertas',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setVendasAbertas(response.data.vendas)
        })
    }, [token])

    async function fecharVenda(idMesa){
        const mesa = {
            mesa: idMesa
        }

        let msgType = 'success'
        const data = await api.post('/venda/fechar',mesa,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            const vendasAtualizadas = vendasAbertas.filter((venda)=> venda._id != idMesa)
            setVendasAbertas(vendasAtualizadas)
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.vendasAbertas}>
            
            <p>vendas abertas</p>

            <div className="VendasAbertas">
                {vendasAbertas.length > 0 &&
                    vendasAbertas.map((venda) =>(
                        <div key={venda.id}>
                            <p>Mesa: {venda._id}</p>
                            <button type="button">Exibir detalhes</button>
                            <button ><Link to={`/adicionar-item-venda/${venda._id}`}>Adicionar produto</Link></button>
                            <button onClick={()=>fecharVenda(venda._id)}>Fechar venda</button>
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