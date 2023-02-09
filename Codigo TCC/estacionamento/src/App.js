import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Clientes from './componentes/pages/Clientes';
import Relatorios from './componentes/pages/Relatorios';
import Garagem from './componentes/pages/Garagem';
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';
import Pagina_inicial from './componentes/pages/Pagina_Incial'; 
import PageNotFound from './componentes/pages/PageNotFound';



function App({titleText}) {


  return (
   
    <div>
     
    

    <Router>
    
    
    <Navbar/>
    <Routes>
    
    <Route exact path = "/" element = {<Pagina_inicial/>}/>
    <Route  path='/Garagem' element ={<Garagem/>}/>
    <Route path='/Clientes' element ={<Clientes/>}/>
    <Route path='/Relatorios' element ={<Relatorios/>}/>
    <Route path='*' element={<Navigate to='/404' />} />
    <Route path='/404' element ={<PageNotFound/>}/>
    
     
    
    
    </Routes>
   
    </Router>
    
    <Footer/>
    </div>
    
    
  )
}

export default App;
