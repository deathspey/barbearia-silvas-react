import { useEffect, useState } from "react";
import { ISchedule } from "../../../../shared/interfaces/ISchedule";
import http from "../../../../service/http";
import ServiceCard from "./ServiceCard";
import style from "./style.module.css";
import SchedulerBarber from "../SchedulerBarber";
import PerfilCard from "../../../../components/PerfilCard";
import { useRecoilValue } from "recoil";
import { employeeState, serviceFilterState } from "../../../../state/atom";

const ServiceList = () => {
  const employee = useRecoilValue(employeeState);
  const filter = useRecoilValue(serviceFilterState);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  function generateHalfHourInterval(date: Date) {
    const timeSlot = [];
    let current = new Date(date);
    current.setHours(8, 0, 0, 0);

    let finalTime = new Date(date);
    finalTime.setHours(18, 0, 0, 0);

    while (current <= finalTime) {
      timeSlot.push(new Date(current));
      current.setMinutes(current.getMinutes() + 30);
    }
    return timeSlot;
  }

  function formatDateToLocalDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  function isFutureDate(date: Date) {
    const now = new Date();
    return date > now;
  }

  useEffect(() => {
    const startOfDay = new Date(filter.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(filter.date);
    endOfDay.setHours(23, 59, 59, 999);

    const body = {
      dataInicial: formatDateToLocalDateTime(startOfDay),
      dataFinal: formatDateToLocalDateTime(endOfDay),
    };

    http
      .post(`/atendimento/${employee.id}/filtrar`, body)
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      });

  }, [filter.date]);

  function handleOpenModal(hour: Date) {
    setSelectedHour(hour);
    setOpenModal(true);
  }

  function filterSchedulesByTopics(schedules: ISchedule[]): ISchedule[] {
    switch (filter.status) {
      case "confirmed":
        return schedules.filter((schedule) => schedule.confirmado);
      case "waitingConfirmation":
        return schedules.filter((schedule) => !schedule.confirmado);
      case "finished":
        return schedules.filter((schedule) => schedule.finalizado);
      case "canceled":
        return schedules.filter((schedule) => schedule);
      default:
        return schedules;
    }
  }

  return (
    <>
      <div className={style.header}>
        {/*TODO ajustar api para trazer nome do estabelecimento */}
        <PerfilCard
          mainInformation={employee.nome}
          secondInformation={"Silva's"}
        />
      </div>
      <div id={style["container--services-list"]}>
        {generateHalfHourInterval(filter.date).map((hour) => {
          return (
            <div className={style.row} key={hour.getTime()}>
              <div className={style.hour}>
                <p className={style["hour-text"]}>
                  {`${
                    hour.getHours() < 10
                      ? "0" + hour.getHours()
                      : hour.getHours()
                  }`}
                  {`:${
                    hour.getMinutes() < 10
                      ? "0" + hour.getMinutes()
                      : hour.getMinutes()
                  }h`}
                </p>
              </div>
              <div className={style["container__service--card"]}>
                {filterSchedulesByTopics(schedules).find(
                  (schedule) =>
                    new Date(schedule.data).getHours() === hour.getHours() &&
                    new Date(schedule.data).getMinutes() === hour.getMinutes()
                ) ? (
                  //TODO ajustar carregamento
                  <ServiceCard
                    schedule={
                      schedules.find(
                        (schedule) =>
                          new Date(schedule.data).getHours() ===
                            hour.getHours() &&
                          new Date(schedule.data).getMinutes() ===
                            hour.getMinutes()
                      )!
                    }
                    setSchedules={setSchedules}
                  />
                ) : (
                  <div
                    className={style.card}
                    style={{
                      cursor: isFutureDate(hour) ? "pointer" : "default",
                    }}
                    onClick={() => isFutureDate(hour) && handleOpenModal(hour)}
                  ></div>
                )}
              </div>
            </div>
          );
        })}

        {openModal && selectedHour && (
          <SchedulerBarber
            selectedDate={selectedHour}
            selectedEmployee={employee}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </>
  );
};

export default ServiceList;