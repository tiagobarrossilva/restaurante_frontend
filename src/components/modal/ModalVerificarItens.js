import styles from "../../components/modal/ModalVerificarItens.module.css"

function ModalVerificarItens({efetuarPedido,exibirModal,ocultarModal,listaAdicionados, setListaAdicionados}){

    function excluirItem(id){
         
        //const itensAtualizados = listaAdicionados.filter((listaAdicionados)=> listaAdicionados.id != id)
        let itensAtualizados = listaAdicionados
        itensAtualizados.splice(id,1)
        
        //{x = listaAdicionados.findIndex((itemIndex)=> itemIndex == item)}

        const itensAtualizados2 = itensAtualizados.filter((itensAtualizados)=> itensAtualizados.id)
        setListaAdicionados(itensAtualizados2)
        console.log(itensAtualizados2)
    }

    function agruparItens(){
        let encontrado
        let resultado = []

        for(let i = 0; i < listaAdicionados.length; i++){
            encontrado = false
            for(let n = 0; n < resultado.length; n++){
                if(listaAdicionados[i].id == resultado[n]){
                    encontrado = true
                    break
                }
            }
            if(!encontrado){
                resultado.push(listaAdicionados[i].id)
            }
        }

        let somatorioQuantidade
        let resultadoAgrupado = []

        for(let i = 0; i < resultado.length; i++){
            somatorioQuantidade = 0
            encontrado = false
            for(let n = 0; n < listaAdicionados.length; n++){
                if(listaAdicionados[n].id == resultado[i]){
                    somatorioQuantidade = somatorioQuantidade + parseInt(listaAdicionados[n].quantidade)
                    if(!encontrado){
                        encontrado = true
                    }
                }
            }
            if(encontrado){
                const item = {
                    id: listaAdicionados[i].id,
                    quantidade: somatorioQuantidade
                }
                resultadoAgrupado.push(item)
            }
        }

        const pedido ={
        "pedido": resultadoAgrupado
        }
        
        console.log(pedido)
        efetuarPedido(pedido)
    }

    return(
        <div className={styles.ModalVerificarItens}>
            <h3>Confira os itens antes de submeter</h3>
            <hr></hr>
            <button onClick={ocultarModal} className={styles.btn}>Voltar</button>
            <button onClick={agruparItens} className={styles.btnConfirmar}>Confirmar pedido</button>
            
            <div>
                
                {listaAdicionados.length > 0 &&
                    listaAdicionados.map((item) =>(
                        <div key={item.id}>
                            
                            
                            {/* {x = listaAdicionados.findIndex((itemIndex)=> itemIndex == item)} */}
                            <p>Index: {listaAdicionados.findIndex((itemIndex)=> itemIndex == item)}</p>
                            <p>Nome: {item.nome}</p>
                            <p>Preço unitario: {item.preco}</p>
                            <p>Quantidade: {item.quantidade}</p>
                            {/* <button onClick={()=> excluirItem(item.id)}>Excluir</button> */}
                            <button onClick={()=> excluirItem(listaAdicionados.findIndex((itemIndex)=> itemIndex == item))} 
                            className={styles.btnExcluir}>Excluir</button>
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