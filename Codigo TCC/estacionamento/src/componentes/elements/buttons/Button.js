import styles from './Button.module.css'


export default  function Button({text,handleSubmit}){
    return(
        <>
        <button className={styles.Button}
        onSubmit={handleSubmit}
        >
        {text}
        </button>
        
        </>
    )
}