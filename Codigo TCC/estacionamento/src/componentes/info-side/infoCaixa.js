import  styles from  './stylesInfos/infosCaixa.module.css'

function  Caixa(){

    const Print = () =>{     
        let printContents = document.getElementById('printCaixa').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; 
        window.location.reload();
      }

    return(

        <div className={styles.bodyCaixa}>
        <div className={styles.userInfo}>

        <div className={styles.iconCaixa}>
           <ul className={styles.valuesUser}>
            <li value = "text">Funcionário:<span>[valueFuncionario]</span></li>
            <li value = "number">Identificador:<span>[valueIdentificador]</span></li>
           </ul> 
        </div>

        <div id='printCaixa'>
        <div className={styles.infosComprovante}>
           <p>[valueEmpresa]</p> 
          <p id='phone'><span>[valuePhone]</span></p> 
        </div>
        <hr></hr>
        <div className={styles.infoCliente}>
            <ul className='infoCaixaLista'>
                <li className={styles.infoCaixaLista}>Data de lancamento:</li>
                <li className={styles.infoCaixaLista}><span>[valuePhone]</span></li>
                <li className={styles.infoCaixaLista}>Endereco:</li>
                <li className={styles.infoCaixaLista}><span>[valueEndereco]</span></li>
                <li className={styles.infoCaixaLista}>Total:</li>
                <li className={styles.infoCaixaLista}><span>[valueTotal]</span></li>
            </ul>
            </div>
            <hr></hr>
            </div>
            <div className={styles.prnterBtn}>
            <button className={styles.btnPrint} type="button" onClick={Print}> </button>
            </div>
        </div>
        
        </div>

    )

};

export default Caixa;