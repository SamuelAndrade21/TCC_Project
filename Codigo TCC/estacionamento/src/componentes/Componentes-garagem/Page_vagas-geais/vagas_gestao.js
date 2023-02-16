import styles from './style_vagas.css'
import Moto from '../../assets/moto.png'
import Carro from '../../assets/car.png'
import Button from '../Button';
import { useState,useEffect } from 'react';
import Layout_vagas from '../../layout-controle-de-vagas/Layout_vagas';


function Vagas(){
   const [ btn, setBtn ] = useState(false)
   const  vagasElement = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
   const vagasElementHorizontal = [1,2,3,4,5,6,7,8,9,10,11,12]
   const vagasOnSideOffide = [1,2,3,4,5,6,7,8,9,10,11,12]
  
    function changeVagasLess (){
       setBtn(true)
       console.log(btn)

        const vagasLess = document.querySelectorAll('.activeLess')   
        vagasLess.forEach((vagas) =>{
          
            if(vagas.classList.contains('activeLess')){
                vagas.classList.add('activeMore')
                vagas.classList.remove('activeLess')
               
            }

            if(vagas.classList.contains('desactiveBtn')){
                vagas.classList.remove('desactiveBtn')
                vagas.classList.add('activeBtn')
            }

            if(btn === false){
                vagas.classList.remove('desactiveBtn')
                vagas.classList.add('activeBtn')
            }
        })
    }
   

    function changeVagasMore(){
        setBtn(true)
        const vagasMore = document.querySelectorAll('.activeMore')
       
        vagasMore.forEach((vagas) =>{
          
            if(vagas.classList.contains('activeMore')){
                vagas.classList.remove('activeMore')
                vagas.classList.add('activeLess')
              
            }

            if(vagas.classList.contains('desactiveBtn')){
                vagas.classList.remove('desactiveBtn')
                vagas.classList.add('activeBtn')
            }

            if(btn === false){
                vagas.classList.remove('desactiveBtn')
                vagas.classList.add('activeBtn')
            }
        })
       
    }






    function removeAllbuttons(){
        // const vagasMore = document.querySelectorAll('.a')
       
        // vagasMore.forEach((vagas) =>{
        //     if(vagas.classList.contains('activeBtn')){
        //         vagas.classList.remove('desactiveBtn') 
        //         vagas.classList.remove('activeBtn') 
        //     } 
                          
        // })

            
        const vagasLess = document.querySelectorAll('.activeBtn') 

        vagasLess.forEach((vagas) =>{
            if(vagas.classList.contains('activeBtn')){
                vagas.classList.remove('activeBtn')
                vagas.classList.add('desactiveBtn')
            }
     
        })

        setBtn(false)
    }

    return(
        <div className='page_principal'> 

        <div className = "container9" >
            {
                vagasElement.map(vagas =>(
                    <div key = {vagas} className = "vagas"><div className="iconVagas"><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort}className= 'activeLess desactiveBtn'></button><img src={Moto}></img></div></div>
                ))
            }
        </div>

        
        <div className = "container7" >
            {
                vagasElement.map(vagas =>(
                    <div key={vagas}  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
                ))
            }
        </div> 

        <div className = "container6" >
            {
                vagasElement.map(vagas =>(
                    <div key={vagas}  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
                ))
            }
        </div> 

        <div className = "container5" >
           {
                vagasElement.map(vagas =>(
                    <div key={vagas}  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
                ))
            }
        </div> 

        <div className = "container4" >
            {
                vagasElement.map(vagas =>(
                    <div key={vagas}  className="vagas"><div className='iconVagas'><button onClick={onabort} className='activeMore desactiveBtn'></button><button  onClick={onabort} className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
                ))
            }
        </div>  

         <div className = "container3" >
            {
                vagasElementHorizontal.map(vagas =>(
                    <div key={vagas} className="vagas horizontal"><div className='iconVagas iconHorizontal'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
                ))
            }
        </div> 

        <div className = "container" >
           {
            vagasOnSideOffide.map(vagas =>(
                <div key={vagas}  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            ))
           }
        </div> 
        
        <div className = "container2" >
          {
            vagasOnSideOffide.map(vagas =>(
                <div key={vagas}  className="vagas"><div className='iconVagas'><button className='activeMore desactiveBtn'></button><button className= 'activeLess desactiveBtn'></button><img src={Carro}></img></div></div>
            ))
           }
        </div>   

        {btn === true &&(
            <Button onclick={removeAllbuttons}/>
        )}
        
  <Layout_vagas changeVagasLess={changeVagasMore}
                changeVagasMore = {changeVagasLess}
  />     

       </div> 
     
        
)}

export default Vagas;