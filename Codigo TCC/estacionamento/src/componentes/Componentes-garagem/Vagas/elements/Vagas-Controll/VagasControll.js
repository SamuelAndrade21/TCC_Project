import styles from './styles.module.css'


function VagasControll(){
    return(
        <div className={styles.container}>
            <div className={styles.containerVagas}>
                <div className={styles.iconCar}></div>
                <div className={styles.valueVagas}>
                    <h3>Vagas Totais:</h3>
                    <input type={'number'}></input>
                </div>
            </div>

            <div className={styles.containerVagas}>
                <div className={styles.iconMoto}></div>
                <div className={styles.valueVagas}>
                    <h3>Vagas Totais:</h3>
                    <input type={'number'}></input>
                </div>
            </div>
        </div>
    )
}

export { VagasControll }