//@ts-ignore
import iconSchedule from "../../assets/icon-schedule.png";
//@ts-ignore
import iconScheduleActive from "../../assets/icon-schedule-active.png";
//@ts-ignore
import iconClient from "../../assets/icon-clients.png";
//@ts-ignore
import iconClientActive from "../../assets/icon-clients-active.png";
//@ts-ignore
import style from "./style.module.css";
import { useState } from "react";
import {Link }from 'react-router-dom'

const NavBar = () => {
  const [menu, setMenu] = useState<string>("agenda");

  return (
    <nav>
      <Link to={'schedule'}
        className={style["button__page-navigation"]}
        style={
          menu === "agenda"
            ? { color: "rgb(255, 255, 255)", backgroundColor: "#01C0B0" }
            : {}
        }
        onClick={() => setMenu("agenda")}
      >
        <img
          src={menu === "agenda" ? iconScheduleActive : iconSchedule}
          width={35}
        />
        <div>Agenda</div>
      </Link>
      <Link to={'clients'}
        className={style["button__page-navigation"]}
        style={
          menu === "clientes"
            ? { color: "rgb(255, 255, 255)", backgroundColor: "#01C0B0" }
            : {}
        }
        onClick={() => setMenu("clientes")}
      >
        <img
          src={menu === "clientes" ? iconClientActive : iconClient}
          width={35}
        />
        <div>Clientes</div>
      </Link>
    </nav>
  );
};

export default NavBar;