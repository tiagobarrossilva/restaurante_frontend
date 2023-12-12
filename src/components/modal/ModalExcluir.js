import styles from "../../components/modal/ModalExcluir.module.css"

function ModalExcluir({tipoModal, exibirModalExcluir, nome, id, excluir}){
    return(

        <div className={styles.ModalExcluir}>
            {tipoModal == 'itens' &&<>
                <p>Excluir o item {nome}</p><br/>
                <p>id do item: {id}</p>
                <button onClick={exibirModalExcluir} className={styles.btnCancelar}>Cancelar</button>
                <button onClick={()=> excluir(id)} className={styles.btnExcluir}>Excluir</button>
            </>}

            {tipoModal == 'funcionarios' &&<>
                <p>Excluir o funcionario de id: {id}</p>
                <p>Nome do funcionario: {nome}</p>
                <button onClick={exibirModalExcluir} className={styles.btnCancelar}>Cancelar</button>
                <button onClick={()=> excluir(id)} className={styles.btnExcluir}>Excluir</button>
            </>}
        </div>


    )
}

export default ModalExcluir