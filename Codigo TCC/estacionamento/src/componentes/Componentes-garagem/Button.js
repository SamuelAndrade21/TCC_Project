import styles from "../Componentes-garagem/Button.module.css"
import { FaTimes } from "react-icons/fa";

function Button(){
    return(
        <div className={styles.btnRemove}>
            <button >
                <FaTimes/>
            </button>
        </div>
    )
}

export default Button