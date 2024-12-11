import { useState, useEffect } from "react";
import TaskCard from "../components/Dashboard/TaskCard";
import { useUser, useAuth } from "@clerk/clerk-react";
import { LuPlus } from "react-icons/lu";
import {
  getHabits,
  deleteHabit,
  fetchHabitLogs,
} from "../services/HabitServices";

export const DashboardPage = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState();
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    if (user) {
      const firstName = user.firstName || "User";
      const motivationalStatements = [
        "Keep pushing forward!",
        "You're doing great!",
        "Believe in yourself!",
        "Stay positive and strong!",
        "Every day is a new opportunity!",
        "Post your wins!",
        "Motivate others!",
        "Stay focused!",
        "Stay committed!",
        "Stay dedicated!",
        "Stay consistent!",
        "Stay persistent!",
        "Stay motivated!",
        "Stay inspired!",
      ];

      const randomIndex = Math.floor(
        Math.random() * motivationalStatements.length
      );
      const randomStatement = motivationalStatements[randomIndex];

      const currentHour = new Date().getHours();
      let timeOfDay;

      if (currentHour < 12) {
        timeOfDay = "Good Morning";
      } else if (currentHour < 18) {
        timeOfDay = "Good Afternoon";
      } else {
        timeOfDay = "Good Evening";
      }

      const welcomeMessage = `${timeOfDay}, ${firstName}\n${randomStatement}`;
      setWelcomeMessage(welcomeMessage);
    }
  }, [user]);

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
          <span className="block text-3xl font-bold text-blue-500 drop-shadow-lg">
            {welcomeMessage.split("\n")[0]}
          </span>
          <span className="block text-2xl text-stone-700 italic mt-2">
            {welcomeMessage.split("\n")[1]}
          </span>
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
