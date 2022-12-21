import React from "react";
import { ReactComponent as ListBtnIconUp } from "./images/listBtnUp.svg";
import { ReactComponent as ListBtnIconDown } from "./images/listBtnDown.svg";
import { todayDateInMs, tomorrowDateInMs } from "../../utils/datetime";
import { TimeTitle } from "./CardGroup.styled";
import CardList from "./CardList";

const CardGroup = ({ cards, groupName, cardPreparation }) => {

  const [isDoneClicked, setIsDoneClicked] = React.useState(false);

  const toggleisDoneClicked = () => {
    setIsDoneClicked((current) => !current);
  }

  const isToday = (date) => date === todayDateInMs;
  const isTomorrow = (date) => date === tomorrowDateInMs;

  const isComplete = (status) => status === "Complete";
  const isIncomplete = (status) => status === "Incomplete";
  const isChallenge = (status) => status === "Challenge";
  const isTask = (status) => status === "Task";

  const assignGroup = (cardData) => {
    const { date, status, type } = cardData;
    const checkedDate = new Date(date).getTime();

    if (isComplete(status) && !isDoneClicked) {
      return "done";
    }

    if (checkedDate < todayDateInMs && isTask(status)) {
      return "previous";
    }

    if (isToday(checkedDate && isTask(status))) {
      return "today";
    }

    if (isTomorrow(checkedDate && isTask(status))) {
      return "tomorrow";
    }

    if (isIncomplete(status) && isChallenge(type)) {
      return "challenge"
    }

    return "next";
  };

  const filterCardsByGroup = (groupName) => {
    if (isDoneClicked) {
      return cards.filter((c) => assignGroup(c) !== "done");
    } else {
    return  cards.filter((c) => assignGroup(c) === groupName);
   }
  }
    
  
  const filterDone = () => {
    return cards.filter((c) => assignGroup(c) === groupName);
 }

  return (
    <div>
      <TimeTitle onClick={toggleisDoneClicked}>
      {filterCardsByGroup(groupName).length > 0 && (
          <p>{groupName}
            {groupName === "done" &&
              <>
              {isDoneClicked ? <ListBtnIconUp /> : <ListBtnIconDown/>}
              <span></span>
            </>
            }
          </p>
        )}
      </TimeTitle>
  
        <CardList
          groupName={groupName}
          filterCardsByGroup={filterDone}
          cardPreparation={cardPreparation}
        /> 
   
      
    </div>
  );
};

export default CardGroup;
