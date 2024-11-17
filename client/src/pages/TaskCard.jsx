import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  subDays,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";

const TASK_KEY = "customTask";

const TaskCard = () => {
  const predefinedSelectedDays = ["Monday", "Wednesday", "Friday"];
  const [task, setTask] = useState({
    id: 1,
    name: "Workout",
    selectedDays: predefinedSelectedDays,
    completion: {}, // Stores completion status by date
  });
  const [viewMode, setViewMode] = useState("week"); // "week" or "month"
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 }) // Start of the current week (Sunday)
  );
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [monthDates, setMonthDates] = useState([]);
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const newMonthDates = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    }).filter((date) => predefinedSelectedDays.includes(format(date, "EEEE")));
    setMonthDates(newMonthDates);
  }, [currentMonth, predefinedSelectedDays]);

  useEffect(() => {
    const newWeekDates = eachDayOfInterval({
      start: startOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
    }).filter((date) => predefinedSelectedDays.includes(format(date, "EEEE")));
    setWeekDates(newWeekDates);
  }, [currentWeekStart, predefinedSelectedDays]);

  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => subDays(prev, 7));
  };
  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };
  // Load the task from localStorage on mount
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem(TASK_KEY));
    if (savedTask) {
      setTask(savedTask);
    }
  }, []);

  // Save the task to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(TASK_KEY, JSON.stringify(task));
  }, [task]);

  // Toggle task completion for a specific day
  const toggleCompletion = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setTask((prevTask) => ({
      ...prevTask,
      completion: {
        ...prevTask.completion,
        [formattedDate]: !prevTask.completion[formattedDate], // Toggle status
      },
    }));
  };

  // Generate dates for the current week
  const getWeekDates = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday start
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  // Check if a date matches a selected day
  const isSelectedDay = (date) => {
    const dayName = format(date, "EEEE"); // Get full day name
    return task.selectedDays.includes(dayName);
  };

  return (
    <div className="collapse collapse-arrow bg-stone-100 transparent max-w-4xl shadow-xl bg-opacity-85">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{task.name}</div>
      <div className="collapse-content">
        {/* View Mode Selector */}
        <div>
          <button
            onClick={() => setViewMode("week")}
            disabled={viewMode === "week"}
          >
            Week View
          </button>
          <button
            onClick={() => setViewMode("month")}
            disabled={viewMode === "month"}
          >
            Month View
          </button>
        </div>

        {/* Render Week or Month View */}
        <div>
          {viewMode === "week" && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center items-center">
                <button onClick={goToPreviousWeek}>{`<`} </button>
                <span style={{ margin: "0 20px" }}>
                  Week of {format(currentWeekStart, "MMM d, yyyy")}
                </span>
                <button onClick={goToNextWeek}>{`>`}</button>
              </div>
              <div className="w-3/5 px-20 py-4 grid grid-cols-3 gap-2">
                {weekDates.map((date) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const isCompleted = !!task.completion[formattedDate]; // Check if task is completed on this day

                  return (
                    <div
                      key={formattedDate}
                      className="flex flex-col justify-center items-center"
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        className="checkbox w-8 h-8 border-2 border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
                        onChange={() => toggleCompletion(date)}
                      />
                      <div>{format(date, "EE d")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === "month" && (
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center items-center">
                <button onClick={goToPreviousMonth}>{`<`}</button>
                <span style={{ margin: "0 20px" }}>
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button onClick={goToNextMonth}>{`>`}</button>
              </div>
              <div className=" px-20 py-4 grid grid-cols-7 gap-2">
                {monthDates.map((date) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const isCompleted = !!task.completion[formattedDate]; // Check if task is completed on this day

                  return (
                    <div
                      key={formattedDate}
                      className="flex flex-col justify-center items-center"
                    >
                      <div>{format(date, " EE d")}</div>
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        className="checkbox w-8 h-8 border-2 border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
                        onChange={() => toggleCompletion(date)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
