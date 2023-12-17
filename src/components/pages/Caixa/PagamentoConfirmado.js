import styles from "../../pages/Caixa/PagamentoConfirmado.module.css"

import { useParams, Link } from 'react-router-dom'
import { useState,useEffect } from "react"
import stylesForm from "../../form/Form.module.css"
import Input from "../../form/Input"
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'

function PagamentoConfirmado(){
    let {mesa,valorTotal,valorRecebido,troco} = useParams()

    return(
        <section>
            <div className={styles.pagamentoConfirmado}>
                <h1>Pagamento realizado</h1>
                <p>Mesa: {mesa}</p>
                <p>Valor total: {valorTotal}</p>
                <p>Valor recebido: {valorRecebido}</p>
                <p>troco: {troco}</p>
            </div>
        </section>
    )
}

export default PagamentoConfirmado