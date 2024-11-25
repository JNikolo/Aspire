import { useState } from "react";

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

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Workout",
      selectedDays: sortedSelectedDays,
      completion: {}, // Stores completion status by date
    },
    {
      id: 2,
      name: "Running",
      selectedDays: sortedSelectedDays,
      completion: {}, // Stores completion status by date
    },
  ]);

  return (
    <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col w-full items-center space-y-10 h-full">
        {tasks.map((task) => (
          <TaskCard task={task}> </TaskCard>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
