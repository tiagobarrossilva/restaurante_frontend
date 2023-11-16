import {useState, useEffect} from 'react'
import Input from "../../form/Input"
import styles from "../../pages/Administrador/EditarItens.module.css"
import stylesForm from "../../form/Form.module.css"
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useParams, Link } from 'react-router-dom'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function EditarItem(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();
    const {id, nome, descricao,preco, tipo} = useParams()
    const [item, setItem] = useState({_id: id,nome: nome,descricao: descricao,preco: preco,tipo: tipo})
   
    async function editarItem(item){
        let msgType = 'success'
        const data = await api.patch(`/item/${id}`,item,{
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

    function handleChange(e){
        setItem({...item, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        editarItem(item)
    }

    return(
        <section className={styles.EditarItem}>
            <h1>Editar o item: {nome}</h1>
            <div className={stylesForm.form_container}>
                <form onSubmit={handleSubmit}>
                    <Input
                        text="Código do item"
                        type="Number"
                        name="id"
                        placeholder="Digite o codigo"
                        value={id}
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Nome"
                        type="text"
                        name="nome"
                        placeholder="Digite o nome"
                        defaultValue={nome}
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Descrição"
                        type="text"
                        name="descricao"
                        placeholder="Digite a descrição"
                        defaultValue={descricao}
                        haldleOnChange={handleChange}
                    />
                    <Input
                        text="Preço"
                        type="Number"
                        name="preco"
                        step="0.01"
                        defaultValue={preco}
                        placeholder="Digite o preço"
                        haldleOnChange={handleChange}
                    />

                    <label>Tipo:</label><br/>
                    <select name={"tipo"} onChange={handleChange} defaultValue={tipo}>
                        <option value="1">Comida</option>
                        <option value="2">Bebida</option>
                        <option value="3">Sobremesa</option>
                        <option value="4">Diversos</option>
                    </select>
                    
                    <button><Link to="/itens-cardapio">Cancelar</Link></button>
                    <input type="submit" value="Salvar alterações"/>
                </form>
            </div>
            
        </section>
    )
}

export default EditarItem