import  styles from  './stylesInfos/infos.css'
import Car from '../assets/Car-example.png'
import Caixa from './infoCaixa';

function InfosCar(){
    return(
        <div className = "bodyInfo">
            <div className = "divCar">
            <img src = {Car}></img>
            </div>

            <div className='firstinfos'>
        <h2 id='titleCar'>FIAT SUV</h2>
        <small id='placa'>[placaCarro]</small>
            </div>

        <div className='reviewInfoCar'>
          
            <ul className='reviewLista'>
                <li className='infoCar'>Cliente:</li>
                <li className='infoCar'>[valueCliente]</li>
                <li className='infoCar'>Horário de entrada:</li>
                <li className='infoCar'>[valueEntrada]</li>
                <li className='infoCar'>Horário de saída:</li>
                <li className='infoCar'>[valueSaida]</li>
            </ul> 
        </div>
        <Caixa/>
        </div>
    )
}

export default InfosCar;