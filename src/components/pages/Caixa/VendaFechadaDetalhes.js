import styles from "../../pages/Caixa/VendaFechadaDetalhes.module.css"
import { useParams, Link } from 'react-router-dom'
import { useState,useEffect } from "react"
import stylesForm from "../../form/Form.module.css"
import Input from "../../form/Input"
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function VendaFechadaDetalhes(){
    let {mesa} = useParams()

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const [venda,setVenda] = useState([])
    const [pedidos,setPedidos] = useState([])
    const navigate = useNavigate();
    let troco = 0
    let valorTotal

    useEffect(() =>{
        api.get(`venda/fechada/${mesa}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setVenda(response.data.venda)
            setPedidos(response.data.venda.pedido)
        })
    }, [token])

    function handleSubmit(e){
        e.preventDefault()

        const valorRecebido = document.getElementById('valorRecebido').value
        if(!valorRecebido){
            return setFlashMessage('Informe o valor recebido', 'error')
        }
        
        if(valorRecebido < venda.precoTotal){
            return setFlashMessage('Valor invalido', 'error')
        }

        troco = valorRecebido - venda.precoTotal
        valorTotal = venda.precoTotal

        const objMesa = {
            mesa: mesa
        }

        confirmarPagamento(objMesa,valorTotal,valorRecebido,troco)
    }

    async function confirmarPagamento(objMesa,valorTotal,valorRecebido,troco){
        let msgType = 'success'
        const data = await api.post('/pagamento',objMesa,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            navigate(`/pagamento-confirmado/${mesa}/${valorTotal}/${valorRecebido}/${troco}`)
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.VendaFechadaDetalhes}>
           
            <div>
                <h1>Recebendo pagamento</h1>
                <p>Mesa: </p>{venda._id}
                <p>Preço total: </p>{venda.precoTotal}
            </div>

            <div>
                <form onSubmit={handleSubmit} className={stylesForm.form_container}>
                    <Input 
                        text="Valor recebido"
                        type="Number"
                        name="valorRecebido"
                        placeholder="Digite o valor recebido"
                    />
                    <input type="submit" value="Receber pagamento"/>
                </form>
            </div>
            
            <div className={styles.elementosPaginaItens}>
                <h4>Listagem de pedidos</h4>
                {pedidos.length > 0 &&
                    pedidos.map((pedido) =>(
                        <div key={pedido.id} className={styles.PaginaItens}>
                            <p>Nome: {pedido.nome}</p>
                            <p>Quantidade: {pedido.quantidade}</p>
                            <br/>
                        </div>
                    ))
                }
            </div>

        </section>
    )
}

export default VendaFechadaDetalhes