import  styles from  './stylesInfos/infosCaixa.css'
import caixa from '../assets/cash-machine.svg'
import print from  "../assets/printer.png"


function  Caixa(){

    const Print = () =>{     
        console.log('print');
        let printContents = document.getElementById('printCaixa').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; 
        window.location.reload();
      }

    return(

        <div className="bodyCaixa">
        <div className='userInfo'>
        <div className='iconCaixa'>

           <ul className='valuesUser'>
            <li value = "text">Funcionário:<span>[valueFuncionario]</span></li>
            <li value = "number">Identificador:<span>[valueIdentificador]</span></li>
           </ul> 

        <img id='imgCaixa' src={caixa}></img>
        
        </div>
        <div id='printCaixa'>
        <div className='infosComprovante'>
           <p>[valueEmpresa]</p> 
          <p id='phone'><span>[valuePhone]</span></p> 
        </div>
        <hr></hr>
        <div className='infoCliente'>
            <ul className='infoCaixaLista'>
                <li className='infoCaixa'>Data de lancamento:</li>
                <li className='infoCaixa'><span>[valuePhone]</span></li>
                <li className='infoCaixa'>Endereco:</li>
                <li className='infoCaixa'><span>[valueEndereco]</span></li>
                <li className='infoCaixa'>Total:</li>
                <li className='infoCaixa'><span>[valueTotal]</span></li>
            </ul>
            </div>
            <hr></hr>
            </div>
            <div className='prnterBtn'>
            <button className='btnPrint' type="button" onClick={Print}> <img id='imgPrinter' src={print}></img></button>
            </div>
        </div>
        
        </div>

    )

};

export default Caixa;