import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

function TaskArray({
  item,
  setTasksArray,
  tasksArray,
  id,
  setAllTask,
  allTask,
}) {
  const handleRadio = () => {
    setTasksArray(
      tasksArray.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      }),
    );
  };

  const handleDeleteTask = () => {
    setTasksArray(
      tasksArray.filter((item) => {
        return item.id !== id;
      }),
    );
  };

  const radioStyle = {
    backgroundImage: item.completed
      ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
      : "",
    borderRadius: "50%",
    height: "19px",
    width: "19px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      <div
        className={`task-item ${item.completed ? "active" : ""} `}
        key={nanoid()}
      >
        <div className="radio-text">
          <div className="radio">
            <div className="circle" onClick={handleRadio} style={radioStyle}>
              {item.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                  <path
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="2"
                    d="M1 4.304L3.696 7l6-6"
                  />
                </svg>
              )}
            </div>
          </div>
          <p>{item.task}</p>
        </div>
        <div className="delete" onClick={handleDeleteTask}>
          <img src="/images/icon-cross.svg" alt="" className="cross" />
        </div>
      </div>
    </div>
  );
}

export default TaskArray;
