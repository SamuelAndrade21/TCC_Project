import styles from './Input.module.css'


export default  function Input({type,placeholder,icon,value,handleChange}){
    return(
        <div className={styles.bodyInput}>
        <input className={styles.Input}
         onChange={ handleChange}
         value={value}
         type={type}   
         placeholder={placeholder} 
          />
       <i className={styles.Icon}>{icon}</i>
        </div>
    )
}