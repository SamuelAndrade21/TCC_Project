import styles from "../Componentes-garagem/Button.module.css"
import { FaTimes } from "react-icons/fa";

function Button({onclick}){
    return(
        <div className={styles.btnRemove}>
            <button onClick={onclick} >
                <FaTimes/>
            </button>
        </div>
    )
}

export default Button