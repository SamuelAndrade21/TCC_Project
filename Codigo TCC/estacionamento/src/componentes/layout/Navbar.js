import React, { useState } from "react";
//Import do use state


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
import { FaList, FaChartBar,FaBars,FaCar,FaTimes } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


import "react-pro-sidebar/dist/css/styles.css";
import styles from './Navbar.module.css'

const Navbar = () => {
  
    //criacao do hook e state iniciall
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div  >
          {}
        <ProSidebar collapsed={menuCollapse}>
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
              <MenuItem active={true} icon={<FiHome />}>
                Pagina Inicial
              </MenuItem>
              <MenuItem  icon={<FaCar />}>Garagem</MenuItem>
              <MenuItem icon={<FaChartBar />}>Relatorios</MenuItem>
              <MenuItem icon={<BiCog />}>Configuracoes</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu>
              <MenuItem icon={<FiLogOut />}>Sair</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Navbar;