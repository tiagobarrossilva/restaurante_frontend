import { Link } from "react-router-dom"
import styles from "../../pages/Administrador/ItensCardapio.module.css"
import { useState,useEffect } from "react"
import api from "../../../utils/api"

function ItensCardapio(){
    const [itens,setItem] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    
    useEffect(() =>{
        api.get('/item',{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) =>{
            setItem(response.data.itens)
        })
    }, [token])
    
    return(
        <section className={styles.form_container}>
            <h3>listagem itens cardapio</h3>

            {itens.length > 0 &&
            itens.map((item) =>(
                <div key={item.id}>
                    <p>Id: {item._id}</p>
                    <p>Nome: {item.nome}</p>
                    <p>Descrição{item.descricao}</p>
                    <p>Preço: {item.preco}</p>
                    <p>Tipo: {item.tipo}</p>
                    <br/><br/>
                </div>
            ))
            }

            {itens.length === 0 && <p>não ha item cadastrado</p>}
        </section>
    )
}

export default ItensCardapio