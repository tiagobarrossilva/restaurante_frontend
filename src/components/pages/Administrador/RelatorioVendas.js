import styles from "../../pages/Administrador/RelatorioVendas.module.css"

import { useParams, Link } from 'react-router-dom'
import { useState,useEffect } from "react"
import stylesForm from "../../form/Form.module.css"
import Input from "../../form/Input"
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

// o useHistory foi removido da versão mais nova do react, usar: useNavigate
import { useNavigate } from 'react-router-dom'



function RelarorioVendas(){
    let {data} = useParams()

    let data2 = data.toLocaleString()
    data2 = data2.split('-')
    data2 = data2[2]+'/'+data2[1]+'/'+data2[0]

    const [pagamentos,setPagamentos] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() =>{
        api.get(`/pagamento/${data}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setPagamentos(response.data.pagamentos)
        })
    }, [token])

    return(
        <section className={styles.RelarorioVendas}>
            <h1>Relatorio de vendas do dia: {data2}</h1>
            {console.log(pagamentos)}

            <div className={styles.elementosPaginaItens}>
                {pagamentos.length > 0 &&
                    pagamentos.map((pagamento) =>(
                        <div key={pagamento.id} className={styles.PaginaItens}>
                            <p>Caixa: {pagamento.caixa}</p>
                            <p>Nome: {pagamento.nome}</p>
                            <p>Valor: {pagamento.valor}</p>
                            <br/>
                        </div>
                    ))
                }
                
                {pagamentos.length === 0 && <p>Não ha vendas para o dia selecionado</p>}
            </div>

            
        </section>
    )
}

export default RelarorioVendas