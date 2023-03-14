import styles from './Link.module.css'


export default  function Link({text,href}){
    return(
        <>
        <a className={styles.Link}
         href={href} 
        >{text}</a>   
        </>
    )
}