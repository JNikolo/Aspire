import { useState, useEffect } from "react";
import TaskCard from "../components/Dashboard/TaskCard";
import { useUser, useAuth } from "@clerk/clerk-react";
import { getHabits, deleteHabit } from "../services/habitServices";

export const DashboardPage = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    if (isSignedIn) {
      console.log("User is signed in");
      console.log("user:", user);
      console.log(user.publicMetadata);
      console.log(window.location.pathname);
      console.log(user);
    }
  }, [isSignedIn, user]);

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
  const sortedSelectedDays = predefinedSelectedDays.sort((a, b) => {
    return dayOrder.indexOf(a) - dayOrder.indexOf(b);
  });

  useEffect(() => {
    getHabits(getToken)
      .then((data) => {
        setTasks(data);
        console.log("Tasks:", data);
        console.log("hello");
      })
      .catch((err) => {
        console.error("Error during fetching all habits:", err);
      });
  }, [getToken]);

  const deleteHabits = async (habitId) => {
    try {
      console.log("Deleting habit with id:", habitId);
      const token = getToken;
      await deleteHabit(habitId, token);
      // setTasks((prevTasks) => prevTasks.filter((task) => task.id !== habitId));
      console.log(`Habit with id ${habitId} deleted successfully`);
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  return (
    <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-col items-center p-4">
      <div className="flex flex-col w-full items-center space-y-10 h-full">
        <h1 className="pt-10 pb-10 text-4xl">Welcome, {user?.firstName}</h1>
        {!tasks && <div>Loading Your Habits...</div>}
        {tasks && tasks.length === 0 && (
          <div>
            <h2 className="text-2xl">You have no habits yet</h2>
            <p className="text-lg">Add a habit to get started</p>
          </div>
        )}
        {tasks &&
          tasks.map((task) => (
            // <div> {task.habitName} </div>
            <TaskCard
              task={task}
              key={task.id}
              taskId={task.id}
              deleteHabit={deleteHabit}
            />
          ))}
        {/* {tasks && tasks.map((task) => <div> {task.habitName} </div>)} */}
      </div>
    </div>
  );
};

export default DashboardPage;
