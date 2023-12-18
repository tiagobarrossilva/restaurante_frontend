import styles from "../../pages/Administrador/Vendas.module.css"
import {useState} from 'react'

import stylesForm from "../../form/Form.module.css"
import Input from "../../form/Input"
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function Vendas(){
    const navigate = useNavigate();
    const {setFlashMessage} = useFlashMessage()

    function handleSubmit(e){
        e.preventDefault()

        let data = document.getElementById('data').value
        if(!data){
            return setFlashMessage('Informe a data', 'error')
        }
        
        console.log(data)
        navigate(`/relatorio-vendas/${data}`)
    }

    return(
        <section className={styles.Vendas}>
            <h1>Gerenciamento de Vendas</h1>

            <form onSubmit={handleSubmit} className={stylesForm.form_container}>
                <Input 
                    text="Informe a data"
                    type="date"
                    name="data"
                    placeholder=""  
                />
                <input type="submit" value="Consultar"/>

            </form>
        </section>
    )
}

export default Vendas