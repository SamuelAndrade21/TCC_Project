import  styles from  './stylesInfos/infos.module.css'
import Caixa from './infoCaixa';
import { useState } from 'react';





function InfosCar(){
 const [chek,setChek] = useState(false)

    return(
        <div className = {styles.bodyInfo}>

            <label
            htmlFor='checkboxInput'
            className={styles.roundSliderContainer}>
            <input type={"checkbox"} id = 'checkboxInput' onChange={(e) =>{setChek(e.target.checked)}} className={styles.InputChange}/>
            <div>Temporario</div>
            <div>Cliente Mensal</div>
            <div className={styles.roundSlider}></div>
            </label>

            {chek === true &&(
                <form className={styles.FormTemp}>
                <span className={styles.required}>Campos obrigatórios *</span>
                    <h2>Dados do Temporário</h2>
                <div className={styles.bodyLabel}>
                    
                <label id='name'>Nome:</label>
                <input
                type={'text'} className={styles.input}/>
                </div>
                
                <div className={styles.bodyLabel}>
                <label id='documento'>Documento:</label>
                <input 
                type={'text'}
                className={styles.input}/> 
                </div>
               
                <div className={styles.bodyLabel}>
                <label id='veiculo'>Veículo:</label>
                <input 
                type={'text'}
                className={styles.input}/> 
                </div>
    
                
                <div className={styles.bodyLabel}>
                <label id='placa'>Placa:<span className={styles.required}>*</span></label>
                <input
                type={'text'}
                className={styles.input}/> 
                </div>

                <button 
                    type='submit'
                    className={styles.btnSubmit}>Adicionar</button>
            
                
    
               </form>
            )}
           
           {chek === false &&(
            <form className={styles.FormTemp}>
                <span className={styles.required}>Campos obrigatórios *</span>
                 <h2>Dados do Cliente</h2>
                <small>Preenchimento automático</small>
                <div className={styles.bodyLabel}>
                    
                    <label id='name'>Nome:</label>
                    <input
                    type={'text'}
                    className={styles.input}/>
                    </div>
                    
                    <div className={styles.bodyLabel}>
                    <label id='documento'>Documento:</label>
                    <input
                    type={'text'}
                    className={styles.input}/> 
                    </div>
                   
                    <div className={styles.bodyLabel}>
                    <label id='veiculo'>Veículo:</label>
                    <input
                    type={'text'}
                    className={styles.input}/> 
                    </div>
        
                    
                    <div className={styles.bodyLabel}>
                    <label id='placa'>Placa:<span className={styles.required}>*</span></label>
                    <input 
                    type={'text'}
                    className={styles.input}/> 
                    </div>

                    <button 
                    type='submit'
                    className={styles.btnSubmit}>Adicionar</button>
            

           </form>
           )
           }
       
       <Caixa/>
        
        </div>
    )
}

export default InfosCar;