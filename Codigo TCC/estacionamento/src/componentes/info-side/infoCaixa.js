import  styles from  './stylesInfos/infosCaixa.module.css'
import { Buffer } from 'buffer';


function  Caixa({Data,cliente}){
   const token =  localStorage.getItem("token")
   const base64Url = token.split('.')[1];
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
   const funcionarioNome = decoded.user[0].nome 
   const funcionarioID = decoded.user[0].funcionario_id
   const telefoneTicket = localStorage.getItem("ticket")
   const endereco = localStorage.getItem("endereco")
   const caixa = localStorage.getItem("caixa")


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
            <li value = "text">Funcionário:<span>{funcionarioNome}</span></li>
            <li value = "number">Caixa:<span>{caixa ? caixa : "Nenhum caixa aberto"}</span></li>
           </ul> 
        </div>

      <div className={styles.ticket}>
        <div id='printCaixa'>
        <div className={styles.infosComprovante}>
          <p id='phone'><span>System Parking - {telefoneTicket}</span></p> 
        </div>
        <hr></hr>
        <div className={styles.infoCliente}>
            <ul className='infoCaixaLista'>
                <li className={styles.infoCaixaLista}>Data de lancamento:</li>
                <li className={styles.infoCaixaLista}><span id='data'>{Data}</span></li>
                <li className={styles.infoCaixaLista}>Endereco:</li>
                <li className={styles.infoCaixaLista}><span>{endereco}</span></li>
                <li className={styles.infoCaixaLista}>Cliente:</li>
                <li className={styles.infoCaixaLista}><span id='cliente'>{cliente}</span></li>
            </ul>
            </div>
            <hr></hr>
            </div>
        </div>

            <div className={styles.prnterBtn}>
            <button className={styles.btnPrint} type="button" onClick={Print}> </button>
            </div>
        </div>
        
        </div>

    )

};

export default Caixa;