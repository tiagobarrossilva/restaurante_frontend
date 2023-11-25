import styles from "../../components/modal/ModalVerificarItens.module.css"

function ModalVerificarItens({ocultarModal,listaAdicionados, setListaAdicionados}){

    function excluirItem(id){
        const itensAtualizados = listaAdicionados.filter((listaAdicionados)=> listaAdicionados.id != id)
        setListaAdicionados(itensAtualizados)
    }

    // pendente
    function agruparItens(){
        console.log(listaAdicionados.length)
        
    }

    return(
        <div className={styles.ModalVerificarItens}>
            <p>Confira os itens antes de submeter</p>
            <button onClick={ocultarModal}>Voltar</button>
            <button onClick={agruparItens}>Confirmar pedido</button>

            <div className="elementosPaginaItens">
                {listaAdicionados.length > 0 &&
                    listaAdicionados.map((item) =>(
                        <div key={item.id}>
                            <p>Nome: {item.nome}</p>
                            <p>Preço unitario: {item.preco}</p>
                            <p>Quantidade: {item.quantidade}</p>
                            <button onClick={()=> excluirItem(item.id)}>Excluir</button>
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