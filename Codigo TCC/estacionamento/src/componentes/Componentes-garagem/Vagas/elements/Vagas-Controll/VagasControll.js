import styles from './styles.module.css'
import React, { useState, useEffect } from 'react'


function VagasControll(){

    const [vagasCarTotais, setVagasCarTotais] = useState('');
    const [vagasBikeTotais, setVagasBikeTotais] = useState('');

    useEffect(() => {
    const storedBikeValue = localStorage.getItem('vagasBikeTotais');
      if (storedBikeValue) {
        // Se houver, define o valor do estado com base no valor armazenado
        setVagasBikeTotais(storedBikeValue);
      }

      const storedValue = localStorage.getItem('vagasCarTotais');
      if (storedValue) {
        setVagasCarTotais(storedValue);
      }
    }, []);
  
    const handleChangeCar = (e) => {
      const valor = e.target.value;
      setVagasCarTotais(valor);
      localStorage.setItem('vagasCarTotais', valor);
    };

    const handleChangeBike = (e) => {
        const valor = e.target.value;
        setVagasBikeTotais(valor);
        localStorage.setItem('vagasBikeTotais', valor);
      };

    return(
        <div className={styles.container}>
            <div className={styles.containerVagas}>
                <div className={styles.iconCar}></div>
                <div className={styles.valueVagas}>
                    <h3>Vagas Totais:</h3>
                    <input type={'number'} value={vagasCarTotais} onChange={handleChangeCar}/>
                </div>
            </div>

            <div className={styles.containerVagas}>
                <div className={styles.iconMoto}></div>
                <div className={styles.valueVagas}>
                    <h3>Vagas Totais:</h3>
                    <input type={'number'} value={vagasBikeTotais} onChange={handleChangeBike}/>
                </div>
            </div>
        </div>
    )
}

export { VagasControll }