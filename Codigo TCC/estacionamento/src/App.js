import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Clientes from './componentes/pages/Clientes';
import Relatorios from './componentes/pages/Relatorios';
import Garagem from './componentes/pages/Garagem';
import Footer from './componentes/layout/Footer';
import Pagina_inicial from './componentes/pages/Dashboard'; 
import PageNotFound from './componentes/pages/PageNotFound';
import Login from './componentes/elements/login/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Cadastrar from './componentes/elements/cadastro/cadastro';
import Dashboard from './componentes/pages/Dashboard';
import Configuracoes  from './componentes/pages/Configuracoes';


function App() {
  


  return (
   
    <div>
     
    
    
      <Router>
      
      <ToastContainer/>

      <Routes>
      
     
          <Route path='/garagem' element ={<Garagem/>}/>
          <Route path='/clientes' element ={<Clientes/>}/>
          <Route path='/relatorios' element ={<Relatorios/>}/>  
          <Route path='/cadastrar' element ={<Cadastrar/>}/>
          <Route exact path = "/" element = {<Login />}/>
          <Route path = "/dashboard" element = {<Dashboard />}/>
          <Route path = "/configuracoes" element = {<Configuracoes />}/>
          <Route path='*' element={<Navigate to='/404' />} />
          <Route path='/404' element ={<PageNotFound/>}/>
  
      </Routes>
    
      </Router>
      
      <Footer/>
     
    </div>
    
    
  )
}

export default App;
