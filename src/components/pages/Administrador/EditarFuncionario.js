import {useState, useEffect} from 'react'
import Input from "../../form/Input"
import styles from "../../pages/Administrador/EditarFuncionarios.module.css"
import stylesForm from "../../form/Form.module.css"
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useParams, Link } from 'react-router-dom'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function EditarFuncionario(){
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();
    const {id, nome, tipo} = useParams()
    const [funcionario, setFuncionario] = useState({_id: id,nome: nome,tipo: tipo})

    function handleChange(e){
        setFuncionario({...funcionario, [e.target.name]: e.target.value})
    }

    async function atualizarFuncionario(funcionario){
        let msgType = 'success'
        const data = await api.patch(`/usuario/${id}`,funcionario,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            navigate('/funcionarios')
            return response.data
        }).catch((erro)=>{
            msgType = 'error'
            return erro.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    function handleSubmit(e){
        e.preventDefault()
        atualizarFuncionario(funcionario)
    }

    return(
        <section className={styles.EditarFuncionario}>
            <h1>Editar dados de funcionario</h1>
            <form onSubmit={handleSubmit} className={stylesForm.form_container}>
                <Input
                    text="Id"
                    type="text"
                    name="id"
                    placeholder="Digite o id"
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
                                
                <label>Tipo:</label><br/>
                <select name={"tipo"} onChange={handleChange} defaultValue={tipo}>
                    <option value="1">Administrador</option>
                    <option value="2">Garcon</option>
                    <option value="3">Caixa</option>
                    <option value="4">Cozinha</option>
                </select>

                <button><Link to="/funcionarios">Cancelar</Link></button> 
                <input type="submit" value="Salvar alterações"/>
            </form>
        </section>
    )

}

export default EditarFuncionario