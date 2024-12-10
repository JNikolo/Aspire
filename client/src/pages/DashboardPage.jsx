import { useState, useEffect } from "react";
import TaskCard from "../components/Dashboard/TaskCard";
import { useUser, useAuth } from "@clerk/clerk-react";
import { LuPlus } from "react-icons/lu";
import {
  getHabits,
  deleteHabit,
  fetchHabitLogs,
} from "../services/habitServices";

export const DashboardPage = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState();
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    if (user) {
      const firstName = user.firstName || "User";
      const motivationalStatements = [
        `Keep pushing forward, ${firstName}!`,
        `You're doing great, ${firstName}!`,
        `Believe in yourself, ${firstName}!`,
        `Stay positive and strong, ${firstName}!`,
        `Every day is a new opportunity, ${firstName}!`,
      ];

      const randomIndex = Math.floor(
        Math.random() * motivationalStatements.length
      );
      const randomStatement = motivationalStatements[randomIndex];

      setWelcomeMessage(randomStatement);
    }
  }, [user]);

  const predefinedSelectedDays = ["Monday", "Thursday", "Saturday"];
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

  useEffect(() => {
    getHabits(getToken)
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        console.error("Error during fetching all habits:", err);
      });
  }, [getToken]);

  return (
    <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-col items-center p-4">
      <div className="flex flex-col w-full items-center space-y-10 h-full">
        <h1 className="pt-10 text-center pb-10 text-4xl text-brown-dark">
          {welcomeMessage}
        </h1>
        {!tasks ? (
          <div>Loading Your Habits...</div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center space-y-5 text-center w-full text-brown-dark">
            <h2 className="text-2xl text-bold">You have no habits yet</h2>
            <p className="text-lg">Add a habit to get started</p>
            <button
              className="btn bg-stone-100 hover:bg-stone-200 border-none text-brown-dark font-bold py-2 px-4 w-3/5 rounded-box shadow-xl"
              onClick={() => {
                window.location.href = "/survey/new";
              }}
            >
              <LuPlus className="text-xl text-blue-dark" />
              Create a New Habit
            </button>
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} taskId={task.id} />
            ))}
            <button
              className="btn bg-stone-100 hover:bg-stone-200 border-none text-brown-dark font-bold py-2 px-4 w-3/5 rounded-box shadow-xl"
              onClick={() => {
                window.location.href = "/survey/new";
              }}
            >
              <LuPlus className="text-xl text-blue-dark" />
              Create a New Habit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
