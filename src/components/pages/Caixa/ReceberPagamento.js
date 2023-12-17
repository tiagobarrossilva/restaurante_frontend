import styles from "../../pages/Caixa/ReceberPagamento.module.css"
import stylesForm from "../../form/Form.module.css"
import Input from "../../form/Input"

import {useState,useEffect} from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function ReceberPagamento(){

    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();
   
    function handleSubmit(e){
        e.preventDefault()
        const mesa = document.getElementById('mesa').value
        if(!mesa){
            return setFlashMessage('informe a mesa', 'error')
        }
        verificarVenda(mesa)
    }

    async function verificarVenda(mesa){
        api.get(`venda/fechada/${mesa}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            navigate(`/venda-fechada-detalhes/${mesa}`)
            return response.data
            
        }).catch((erro)=>{
            setFlashMessage('Venda não encontrada', 'error')
            return erro.response.data
        })
    }

    return(
        <section>
            <div className={styles.ReceberPagamento}>
                <h1>Receber pagamento</h1>
                <form onSubmit={handleSubmit} className={stylesForm.form_container}>
                    <Input 
                        text="Numero da mesa"
                        type="Number"
                        name="mesa"
                        placeholder="Digite o numero da mesa"  
                    />
                    <input type="submit" value="Verificar"/>
                </form>
            </div>
        </section>
    )
}

export default ReceberPagamento