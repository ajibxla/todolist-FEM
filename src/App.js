import "./App.css";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import TaskArray from "./components/TaskArray";
import { Draggable } from "react-drag-reorder";
import WindowResize from "./components/WindowResize";

function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [newTask, setNewTask] = useState("");
  const [tasksArray, setTasksArray] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const [showActiveTasks, setShowActiveTasks] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  useEffect(() => {
    setAllTask(tasksArray);
  }, [tasksArray]);

  // console.log(allTask);

  const newWin = WindowResize();
  const windowSize = newWin.props.children;

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  // console.log(allTask);

  const drop = (e) => {
    const copyListItems = [...tasksArray];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTasksArray(copyListItems);
  };

  const inputNewTask = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (item) => {
    setTasksArray([...tasksArray, item]);
    // setAllTask([...tasksArray, item]);
  };

  const submitNewTask = (e) => {
    e.preventDefault();

    if (newTask === null || newTask.match(/^ *$/) !== null) {
      return;
    } else {
      let taskObj = {
        task: newTask,
        id: nanoid(),
        completed: false,
      };
      addTask(taskObj);
      setNewTask("");
    }
  };

  //Clear all completed items from the list
  const clearCompleted = () => {
    const newArr = tasksArray.filter((task) => {
      return !task.completed;
    });

    setTasksArray(newArr);

    console.log(newArr);
  };

  const showAll = () => {
    setShowActiveTasks(false);
    setShowCompletedTasks(false);
  };

  //show active (unmarked) items
  const showActive = () => {
    const n = tasksArray.filter((item) => {
      return item.completed === false;
    });

    setAllTask(n);
    setShowActiveTasks(true);
    setShowCompletedTasks(false);
  };

  //Show completed items - marked items
  const showCompleted = () => {
    if (showActiveTasks) {
      setAllTask(
        tasksArray.filter((item) => {
          return item.completed;
        }),
      );
    }
    setShowActiveTasks(true);
    setShowCompletedTasks(true);
  };

  return (
    <main id="main">
      <div className="bg-image">
        <img
          src={`${
            windowSize > 500
              ? "/images/bg-desktop-light.jpg"
              : "/images/bg-mobile-light.jpg"
          }`}
          alt=""
        />
      </div>
      <div className="container">
        <div className="first-section">
          <h2>Todo</h2>

          <form onSubmit={submitNewTask}>
            <div className="input-holder">
              <div className="circle-holder">
                <div className="circle-main"></div>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Create a new todo..."
                  onChange={inputNewTask}
                  className="input"
                  value={newTask}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="second-section">
          <div className="tasks-array">
            {tasksArray.map((item, index) => {
              return (
                <div
                  draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={nanoid()}
                >
                  <TaskArray
                    item={item}
                    key={nanoid()}
                    setTasksArray={setTasksArray}
                    tasksArray={tasksArray}
                    id={item.id}
                    // setAllTask={setAllTask}
                    // allTask={allTask}
                  />
                </div>
              );
            })}
          </div>

          <div className="tasksleft--clr">
            <div className="tasks-left">
              {/* <p>
                {tasksArray.length === 0 ? "No " : `${tasksArray.length} `}
                {tasksArray.length > 1 && showActiveTasks ? " items " : "item "}
                left
              </p> */}
            </div>
            <div className="clr-all" onClick={clearCompleted}>
              <p>Clear completed</p>
            </div>
          </div>
        </div>
        {/* <div className="filter-container">
          <p className="all" onClick={showAll}>
            All
          </p>
     
          <p className="active-task" onClick={showActive}>
            Active
          </p>
   
          <p className="completed" onClick={showCompleted}>
            Completed
          </p>
        </div> */}
      </div>
    </main>
  );
}

export default App;
