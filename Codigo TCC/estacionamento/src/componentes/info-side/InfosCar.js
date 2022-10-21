import  styles from  './stylesInfos/infos.css'
import Car from '../assets/Car-example.png'

function InfosCar(){
    return(
        <div className = "bodyInfo">
            <div className = "divCar">
            <img src = {Car}></img>
            </div>

        </div>
    )
}

export default InfosCar;