import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Clientes from './componentes/pages/Clientes';
import Relatorios from './componentes/pages/Relatorios';
import Garagem from './componentes/pages/Garagem';
import Navbar from './componentes/layout/Navbar';
import Footer from './componentes/layout/Footer';

function App() {
  return (
    
   <Router>
    <Navbar/>

    <Routes>
    <Route exact path="/" element={<Garagem/>}/>
    <Route path="/clientes" element = {<Clientes/>}/>
    <Route path="/relatorios" element = {<Relatorios/>}/>    
    </Routes>
    <Footer />
   </Router>
   
  );
}

export default App;
