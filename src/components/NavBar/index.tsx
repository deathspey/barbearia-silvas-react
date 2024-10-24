
import iconSchedule from "../../assets/icon-schedule.png";
import iconScheduleActive from "../../assets/icon-schedule-active.png";
import iconClient from "../../assets/icon-clients.png";
import iconClientActive from "../../assets/icon-clients-active.png";
import style from "./style.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/fluxin-logo.png'

const NavBar = () => {
  const location = useLocation();
  const isThisPage = (path : string):boolean =>{
    return location.pathname === path;
  }

  return (

    <nav>
      <img src={logo} width={70} alt="Logo da FluxIn"/>
      <Link
        to={""}
        className={style["button__page-navigation"]}
        style={{
          color: isThisPage("/panel") ? "#fff" : "#000",
        }}
      >
        <img
          src={ isThisPage("/panel")  ? iconScheduleActive : iconSchedule}
          width={35}
        />
        <p className={style.title}>Agenda</p> 
      </Link>
      <Link
        to={"clients"}
        className={style["button__page-navigation"]}
        style={{
          color: isThisPage("/panel/clients")  ? "#fff" : "#000",
        }}
      >
        <img
          src={isThisPage("/panel/clients") ? iconClientActive : iconClient}
          width={35}
        />
        <p className={style.title}>Clientes</p>
      </Link>
    </nav>
  );
};

export default NavBar;
