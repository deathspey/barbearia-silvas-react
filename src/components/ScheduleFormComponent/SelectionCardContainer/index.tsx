import { useState } from "react";
import OptionsContainer from "../OptionsContainer";
import styled from "styled-components";

const Card = styled.div`
  max-width: 700px;
  min-width: 700px;
  max-height: 300px;
  border: 2px solid #000;
  padding: 20px;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const CircleIcon = styled.div`
  background-color: #000;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const SelectedOptionTitle = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 25px;
  font-weight: 500;
  p{
    margin: 0
  }
`;

interface SelectionCardContainerProps{
  optionSelected: IOption, 
  typeSelection: string,
  title: string, 
}

const SelectionCardContainer = ({optionSelected, typeSelection, title}: SelectionCardContainerProps) => {
  const [dateTimeSelected, setDateTimeSelected] = useState("");

  const handleSelectedTimeAndDateToShow = (dateAndTime: string) => {
    setDateTimeSelected(dateAndTime)
  };

  return optionSelected == null ? (
    <Card>
      <Title>
        <CircleIcon>
          <img
            src={`/images/${typeSelection}.png`}
            width="30px"
            alt={`Icone de ${typeSelection}`}
          />
        </CircleIcon>
        <SelectedOptionTitle className="card__title__name">
          <p>{title}:</p>
        </SelectedOptionTitle>
      </Title>
      <OptionsContainer
        typeSelection={typeSelection}
        // selectedTimeAndDate={selectedTimeAndDate}
        handleSelectedTimeAndDateToShow={handleSelectedTimeAndDateToShow}
      />
    </Card>
  ) : (
    <Card>
      <Title>
        <CircleIcon>
          <img
            src={`/images/${typeSelection}.png`}
            width="30px"
            alt={`Icone de ${typeSelection}`}
          />
        </CircleIcon>
        <SelectedOptionTitle>
          <p>
            {typeSelection !== "horario"
              ? optionSelected.nome
              : dateTimeSelected}
          </p>
          <small>{typeSelection}</small>
        </SelectedOptionTitle>
      </Title>
    </Card>
  );
};

export default SelectionCardContainer;