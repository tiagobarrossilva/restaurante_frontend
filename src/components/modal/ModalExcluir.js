import styles from "../../components/modal/ModalExcluir.module.css"

function ModalExcluir({tipoModal, exibirModalExcluir, nome, id, excluirItem}){
    return(
        <div className={styles.ModalExcluir}>
            {tipoModal == 'itens' &&<>
                <p>excluir o item {nome}</p><br/>
                <p>id do item: {id}</p>
                <button onClick={exibirModalExcluir}>Cancelar</button>
                <button onClick={()=> excluirItem(id)}>Excluir</button>
            </>}

            {tipoModal == 'funcionarios' &&<>
                <p>excluir o funcionario de id: {id}</p>
                <p>Nome do funcionario: {nome}</p>
                <button onClick={exibirModalExcluir}>Cancelar</button>
            </>}
        </div>
    )
}

export default ModalExcluir