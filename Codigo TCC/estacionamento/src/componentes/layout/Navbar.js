import styles from './Navbar.module.css';
import {Link} from 'react-router-dom'

function Navbar ()
{
    return (

    <nav className= {`${styles.navBar}`}>
        
        <Link to= "/"><button className= {`${styles.btn_list}`}>Garagem</button></Link>
        <Link to= "/clientes"><button className= {`${styles.btn_list}`}>Clientes</button></Link>
        <Link to= "/relatorios"><button className= {`${styles.btn_list}`}>Relatorios</button></Link>
        <hr></hr>
    </nav>
    )
}


export default Navbar;