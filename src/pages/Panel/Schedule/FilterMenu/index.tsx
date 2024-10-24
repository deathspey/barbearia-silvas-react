import style from "./style.module.css";
import Calendar from "./Calendar";
import { useRecoilState } from "recoil";
import { schedulesFilterState } from "../../../../state/atom";
import { IScheduleFilter } from "../../../../shared/interfaces/IScheduleFilter";

const FilterMenu = () => {
  const [filter, setFilter] = useRecoilState(schedulesFilterState);

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: IScheduleFilter = {
      date: filter.date,
      status: filter.status,
    };
    if (filter.status !== event.target.id) {
      newFilter.status = event.target.id;
    } else {
      newFilter.status = null;
    }
    setFilter(newFilter);
  };

  return (
    <div id={style["filter-menu"]}>
      <Calendar />
      <div className={style.filter}>
        <p className={style.filter__title}>Filtro</p>
        <span>
          <input
            id="confirmed"
            type="checkbox"
            checked={filter.status === "confirmed"}
            onChange={onChangeFilter}
          />
          <label htmlFor="confirmed">Confirmado</label>
        </span>
        <span>
          <input
            id="finished"
            type="checkbox"
            checked={filter.status === "finished"}
            onChange={onChangeFilter}
          />
          <label htmlFor="finished">Finalizado</label>
        </span>
      </div>
    </div>
  );
};

export default FilterMenu;
