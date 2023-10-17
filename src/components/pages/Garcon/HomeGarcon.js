import styles from "../../pages/Garcon/HomeGarcon.module.css"

function HomeGarcon(){
    return(
        <section className={styles.form_container}>
            <h1>Home do garçon</h1>
            <div>
                <button type="button">Vendas abertas</button>
                <button type="button">Abrir vendas</button>
                <button type="button">Adicionar produto a venda</button>
            </div>
        </section>
    )
}

export default HomeGarcon