import {useState} from 'react'
import styles from "../../pages/Garcom/AbrirVenda.module.css"
import stylesForm from "../../form/Form.module.css"
import Input from "../../form/Input"
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function AbrirVenda(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        aberturaVenda()
    }

    async function aberturaVenda(){
        const mesa = {
            mesa: document.getElementById('mesa').value
        }

        let msgType = 'success'
        const data = await api.post('/venda/abrir',mesa,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            navigate('/vendas-abertas')
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.AbrirVenda}>
            <h1>abertura de venda</h1>
            <form onSubmit={handleSubmit} className={stylesForm.form_container}>
                <Input 
                    text="Numero da mesa"
                    type="Number"
                    name="mesa"
                    placeholder="Digite o numero da mesa"  
                />
                <input type="submit" value="Abrir venda"/>

            </form>
            
        </section>
    )

}

export default AbrirVenda