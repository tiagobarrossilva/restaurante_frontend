import {useState} from 'react'
import Input from "../../form/Input"
import styles from "../../pages/Administrador/AdicionarAoCardapio.module.css"
import stylesForm from "../../form/Form.module.css"
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function AdicionarAoCardapio(){
    const [token] = useState(localStorage.getItem('token') || '')
    const [item, setItem] = useState({})
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();
    const [tipoItem, setTipoItem] = useState({})
    
    function handleChange(e){
        setItem({...item, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        
        // enviar o item para o banco
        adicionarItem(item)
    }

    async function adicionarItem(item){
        let msgType = 'success'
        const data = await api.post('/item',item,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            navigate('/itens-cardapio')
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return(
        <section className={styles.AdicionarAoCardapio}>
            <h1>Adicionar item ao cardapio</h1>
            <div className={stylesForm.form_container}>
                <form onSubmit={handleSubmit}>
                    <Input
                        text="Código do item"
                        type="Number"
                        name="id"
                        placeholder="Digite o codigo"
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Nome"
                        type="text"
                        name="nome"
                        placeholder="Digite o nome"
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Descrição"
                        type="text"
                        name="descricao"
                        placeholder="Digite a descrição"
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Preço"
                        type="Number"
                        name="preco"
                        step="0.01"
                        placeholder="Digite o preço"
                        haldleOnChange={handleChange}
                    />

                    <label>Tipo:</label><br/>
                    <select name={"tipo"} onChange={handleChange}>
                        <option defaultValue="0">...</option>
                        <option value="1">Comida</option>
                        <option value="2">Bebida</option>
                        <option value="3">Sobremesa</option>
                        <option value="4">Diversos</option>
                    </select>
                    <input type="submit" value="Adicionar item ao cardapio"/>
                </form>
            </div>
            
        </section>
    )
}

export default AdicionarAoCardapio