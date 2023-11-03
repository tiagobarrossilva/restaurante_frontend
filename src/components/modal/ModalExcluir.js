import styles from "../../components/modal/ModalExcluir.module.css"

function ModalExcluir({nomeItem,exibirModalExcluir,idItem, excluirItem}){
    return(
        <div className={styles.ModalExcluir}>
            <p>excluir o item {nomeItem}</p><br/>
            <p>id do item: {idItem}</p>
            <button onClick={exibirModalExcluir}>Cancelar</button>
            <button onClick={()=> excluirItem(idItem)}>Excluir</button>
        </div>
    )
}

export default ModalExcluir