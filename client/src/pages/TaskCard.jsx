import React, { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  subDays,
  addMonths,
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
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => subDays(prev, 7));
  };
  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  };
  const monthDates = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });
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

  // Generate dates for the current month
  const getMonthDates = () => {
    const start = startOfMonth(currentDate);
    const daysInMonth = addMonths(start, 1).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => addDays(start, i));
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
        <h2></h2>
        {/* Week Navigation */}
        <div>
          <button onClick={goToPreviousWeek}>Previous Week</button>
          <span style={{ margin: "0 20px" }}>
            Week of {format(currentWeekStart, "MMM d, yyyy")}
          </span>
          <button onClick={goToNextWeek}>Next Week</button>
        </div>
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
            <div>
              <h3>Week View</h3>

              <ul
                style={{ display: "flex", listStyleType: "none", padding: 0 }}
              >
                {getWeekDates().map(
                  (date) =>
                    isSelectedDay(date) && (
                      <li
                        key={date}
                        style={{
                          marginRight: "1em",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox border-2 border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
                        />
                        {format(date, "EEE ")}{" "}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          {viewMode === "month" && (
            <div className="flex flex-col items-center">
              <h3>Month View</h3>
              <div className="grid grid-cols-7 gap-2 border w-3/4 ">
                {monthDates.map((date) => {
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
                      <div>{format(date, "d")}</div>
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
