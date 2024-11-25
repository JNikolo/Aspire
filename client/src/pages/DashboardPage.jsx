// import { useState } from "react";

// import { useSearchParams } from "react-router-dom";
import TaskCard from "./TaskCard";

export const DashboardPage = () => {
  // const [daysDisplayed, setDaysDisplayed] = useState([]);
  // const [weekOf, setWeekOf] = useState(null);
  // const [tasksPerDay, setTasksPerDay] = useState(null);
  // const [tasks, setTasks] = useState(null);
  const predefinedSelectedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Sunday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Sort predefinedSelectedDays according to the custom order
  const sortedSelectedDays = predefinedSelectedDays.sort((a, b) => {
    return dayOrder.indexOf(a) - dayOrder.indexOf(b);
  });

  const task = {
    id: 1,
    name: "Workout",
    selectedDays: sortedSelectedDays,
    completion: {}, // Stores completion status by date
  };
  const task1 = {
    id: 1,
    name: "Biking",
    selectedDays: sortedSelectedDays,
    completion: {}, // Stores completion status by date
  };
  return (
    <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-col items-center justify-center p-4">
      {/* Habit Selector */}
      {/* <ul className="basis-1/4 m-3 bg-stone-100 transparent menu w-full rounded-box shadow-xl bg-opacity-85 flex flex-col space-y-2">
        <li className="menu-title text-brown-dark text-2xl font-bold">My Habits</li>
        <hr className="my-1 border-t-2 border-[#86919C] w-full shadow-xl" />
        <li><a className="hover:bg-blue-light p-4 border-2 border-gray/20 text-brown-dark font-semibold hover:bg-brown-dark text-xl">Item 1</a></li>
        <li><a className="hover:bg-blue-light p-4 border-2 border-gray/20 text-brown-dark font-semibold text-xl">Item 2</a></li>
        
      </ul> */}
      {/* card from daisyui used to display content*/}
      <div className="flex flex-col w-full items-center space-y-10 h-full">
        <TaskCard task={task}> </TaskCard>
        <TaskCard task={task1}> </TaskCard>
      </div>
    </div>
  );
};

export default DashboardPage;
