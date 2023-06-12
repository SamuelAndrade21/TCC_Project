//impor dos links
import { Link,useNavigate } from 'react-router-dom';



//Import do use state
import React, { useEffect, useState } from "react";

//import dos componentes do sidebar
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import dos icons 
import { FaChartBar,FaBars,FaCar,FaTimes,FaUsers } from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
//import das páginas
import "react-pro-sidebar/dist/css/styles.css";
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate()

  function handleLogout(){
    if(localStorage.getItem("token")){
        localStorage.removeItem("token")
        window.location.replace('http://localhost:3000')
    }
  }
    //criacao do hook e state inicial
    const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div className={styles.corpo} >
          {}
        <ProSidebar className={styles.navBar} collapsed={menuCollapse}>
          <SidebarHeader >
          <div className="logotext">
              
                 <p>{menuCollapse ? `${""}`: " "}</p>
            </div>
            <div className={styles.closemenu} onClick={menuIconClick}>
              {menuCollapse ? (
                <FaBars/>
              ) : (
                <FaTimes/>
              )}
            </div>
            
          </SidebarHeader>
          <SidebarContent >
            <Menu >
                  
              <MenuItem  active={true} icon={<MdSpaceDashboard fontSize= "17px" />}>
              <Link to={"/dashboard"}>Dashboard</Link>
              </MenuItem>

              
              <MenuItem icon={<FaCar fontSize= "17px"  />}>
               <Link to={"/garagem"}>Garagem</Link> 
              </MenuItem>

              <MenuItem icon={<FaChartBar fontSize= "17px"  />}>
               <Link to={"/relatorios"}>Relatórios</Link> 
              </MenuItem>

              <MenuItem icon={<FaUsers fontSize= "17px"  />}>
              <Link to={"/clientes"}>Clientes</Link> 
              </MenuItem>

              <MenuItem icon={<BiCog fontSize= "17px"  />}>
              <Link to={"/configuracoes"}>Configurações</Link> 
              </MenuItem>

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu>
              <MenuItem icon={<FiLogOut fontSize= "17px"  />}><Link onClick={handleLogout}>Sair</Link></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Navbar;