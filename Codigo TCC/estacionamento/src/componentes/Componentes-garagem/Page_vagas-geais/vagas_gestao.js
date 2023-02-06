import styles from './style_vagas.css'
import Moto from '../../assets/moto.png'
import Carro from '../../assets/car.png'
import Button from '../Button';
import { useState,useEffect } from 'react';
import Layout_vagas from '../../layout-controle-de-vagas/Layout_vagas';


function Vagas(){
   const [ btn, setBtn ] = useState(false) 

    function changeVagasMore (){
       setBtn(true)

        const vagasLess = document.querySelectorAll('.activeLess')   
        vagasLess.forEach((vagas) =>{
          
            if(vagas.classList.contains('activeLess')){
                vagas.classList.toggle('activeMore')
                vagas.classList.remove('activeLess')
                vagas.classList.add('activeBtn')
            }

            if(vagas.classList.contains('desactiveBtn')){
                vagas.classList.remove('desactiveBtn')
                vagas.classList.add('activeBtn')
            }
        })
    }
   

    function changeVagasLess(){
        setBtn(true)
        const vagasMore = document.querySelectorAll('.activeMore')
       
        vagasMore.forEach((vagas) =>{
          
            if(vagas.classList.contains('activeMore')){
                vagas.classList.remove('activeMore')
                vagas.classList.add('activeLess')
                vagas.classList.add('activeBtn')
            }

            if(vagas.classList.contains('desactiveBtn')){
                vagas.classList.remove('desactiveBtn')
                vagas.classList.add('activeBtn')
            }
        })
       
    }

    return(
        <div className='page_principal'> 

        <div className = "container9" >
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
            <div className="vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
        </div>
{/* 
         <div className = "container8" >
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
            <div className="vagas"></div>
        </div>       */}
        
        <div className = "container7" >
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div> 

        <div className = "container6" >
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div> 

        <div className = "container5" >
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div> 

        <div className = "container4" >
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div>  

         <div className = "container3" >
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div> 

        <div className = "container" >
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div> 
        
        <div className = "container2" >
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            <div  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
        </div>   

        {btn === true &&(
            <Button/>
        )}
        
  <Layout_vagas changeVagasLess={changeVagasLess}
                changeVagasMore = {changeVagasMore}
  />

      

       </div> 

       
        
)}

export default Vagas;