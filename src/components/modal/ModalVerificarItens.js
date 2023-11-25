import styles from "../../components/modal/ModalVerificarItens.module.css"

function ModalVerificarItens({ocultarModal,listaAdicionados, setListaAdicionados}){

    function excluirItem(id){
        const itensAtualizados = listaAdicionados.filter((listaAdicionados)=> listaAdicionados.item != id)
        setListaAdicionados(itensAtualizados)
    }

    return(
        <div className={styles.ModalVerificarItens}>
            <p>Confira os itens antes de submeter</p>
            <button onClick={ocultarModal}>Voltar</button>          

            <div className="elementosPaginaItens">
                {listaAdicionados.length > 0 &&
                    listaAdicionados.map((item) =>(
                        <div key={item.id}>
                            <p>Nome: {item.nomeItem}</p>
                            <p>Preço unitario: {item.preco}</p>
                            <p>Quantidade: {item.quantidade}</p>
                            <button onClick={()=> excluirItem(item.item)}>Excluir</button>
                            <br/><br/>
                            
                        </div>
                    ))
                }
                
                {listaAdicionados.length === 0 && <p>não ha item cadastrado</p>}
            </div>

        </div>
    )
}

export default ModalVerificarItens