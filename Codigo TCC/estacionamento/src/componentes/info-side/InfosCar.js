import  styles from  './stylesInfos/infos.css'
import Car from '../assets/Car-example.png'

function InfosCar(){
    return(
        <div className = "bodyInfo">
            <div className = "divCar">
            <img src = {Car}></img>
            </div>

            <div className='firstinfos'>
        <h2 id='titleCar'>Car name</h2>
        <small id='placa'>Placa do carro</small>
            </div>

        <div className='reviewInfoCar'>
            <ul className='reviewLista'>
                <li className='infoCar'>Info car</li>
                <li className='infoCar'>Info car</li>
                <li className='infoCar'>Info car</li>
                <li className='infoCar'>Info car</li>
                <li className='infoCar'>Info car</li>
                <li className='infoCar'>Info car</li>
            </ul>
        </div>
        </div>
    )
}

export default InfosCar;