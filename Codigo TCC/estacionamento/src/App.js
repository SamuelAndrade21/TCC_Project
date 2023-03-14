import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Clientes from './componentes/pages/Clientes';
import Relatorios from './componentes/pages/Relatorios';
import Garagem from './componentes/pages/Garagem';
import Footer from './componentes/layout/Footer';
import Pagina_inicial from './componentes/pages/Pagina_Incial'; 
import PageNotFound from './componentes/pages/PageNotFound';
import Login from './componentes/elements/login/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {


  return (
   
    <div>
     
    

    <Router>
    
    <ToastContainer/>

    <Routes>
    
    <Route exact path = "/" element = {<Login/>}/>
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
