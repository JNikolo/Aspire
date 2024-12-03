import { useState, useRef } from "react";

// import { useSearchParams } from "react-router-dom";
import TaskCard from "../components/Dashboard/TaskCard";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export const DashboardPage = () => {
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    if (isSignedIn) {
      console.log("User is signed in");
      console.log("user:", user?.username);
      console.log(user.publicMetadata);
      console.log(window.location.pathname);
      console.log(user);
    }
  }, [isSignedIn, user]);

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

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch("/habits");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-col items-center p-4">
      <div className="flex flex-col w-full items-center space-y-10 h-full">
        <h1 className="pt-10 pb-10 text-4xl">Welcome, {user?.username}</h1>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id}></TaskCard>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
