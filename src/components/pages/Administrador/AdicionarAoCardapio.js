import {useState} from 'react'
import Input from "../../form/Input"
import styles from "../../pages/Administrador/AdicionarAoCardapio.module.css"
import useItem from "../../../hooks/useItem"

function AdicionarAoCardapio(){

    const {adicionarItem} = useItem()

    const [item, setItem] = useState({})

    function handleChange(e){
        setItem({...item, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        
        // enviar o item para o banco
        adicionarItem(item)
    }

    return(
        <section className={styles.form_container}>
            <h2>Adicionar item ao cardapio</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Id"
                    type="Number"
                    name="id"
                    placeholder="Digite o id"
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
                <Input
                    text="Tipo"
                    type="Number"
                    name="tipo"
                    placeholder="Digite o tipo"
                    haldleOnChange={handleChange}
                />
                <input type="submit" value="Adicionar item ao cardapio"/>
            </form>
        </section>
    )
}

export default AdicionarAoCardapio