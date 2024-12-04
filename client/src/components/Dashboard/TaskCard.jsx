import React, { useState, useEffect, useRef } from "react";
import Timeline from "./Timeline";
import CompletionModal from "./CompletionModal";

import {
  format,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfYear,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  subDays,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
const initialData = {
  title: "Hello",
  description: "bruh",
  postToCommunities: true,
  communitiesPost: [],
  image: null,
};
const TASK_KEY = "customTask";

const TaskCard = (props) => {
  const [task, setTask] = useState(props.task);
  const taskId = task?.id;
  const [initialData, setInitialData] = useState(null);
  const selectedDays = task.frequency.map((freq) => freq.dayOfWeek);

  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 }) // Start of the current week (Sunday)
  );
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [currentYear, setCurrentYear] = useState(startOfYear(new Date()));

  const [monthDates, setMonthDates] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [monthHover, setMonthHover] = useState(null);

  useEffect(() => {
    if (selectedDays && selectedDays.length > 0) {
      const newMonthDates = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
      }).filter((date) => selectedDays.includes(format(date, "EEE")));
      setMonthDates(newMonthDates);
    }
  }, [currentMonth]);

  useEffect(() => {
    if (selectedDays && selectedDays.length > 0) {
      const newWeekDates = eachDayOfInterval({
        start: startOfWeek(currentWeekStart, { weekStartsOn: 0 }),
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      }).filter((date) => selectedDays.includes(format(date, "EEE")));

      setWeekDates(newWeekDates);
    }
  }, [currentWeekStart]);

  const [yearDates, setYearDates] = useState([]);

  useEffect(() => {
    if (selectedDays && selectedDays.length > 0) {
      const newYearDates = eachDayOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }).filter((date) => {
        const formattedDate = format(date, "EEE");

        return selectedDays.includes(formattedDate);
      });
      setYearDates(newYearDates);
    }
  }, []);

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

  const goToNextYear = () => {
    setCurrentYear((prev) => addMonths(prev, 12));
  };
  const goToPreviousYear = () => {
    setCurrentYear((prev) => subMonths(prev, 12));
  };
  const [completionDate, setCompletionDate] = useState(null);
  const [toggleDate, setToggleDate] = useState(null);
  const [completion, setCompletion] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const handleCheckbox = (date) => {
    setCompletionDate(format(date, "MMM d, yyyy"));

    setToggleDate(date);

    //if post already exists for that day unclicking the checkbox will delete the post
    // if (task.completion[formattedDate]) {
    //   deletePost(formattedDate);
    //   setTask((prevTask) => ({
    //     ...prevTask,
    //     completion: {
    //       ...prevTask.completion,
    //       [formattedDate]: !prevTask.completion[formattedDate], // Toggle status
    //     },
    //   }));
    //   console.log(task.completion);
    // }
    //}
    //else {
    // show modal to create a post
  };

  const toggleCompletion = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log("formattedDate:", formattedDate);
    setCompletion((prevCompletion) => ({
      ...prevCompletion,
      [formattedDate]: !prevCompletion[formattedDate], // Toggle status
    }));
    setToggleDate(null);
    document.getElementById(`my_modal_${taskId}`).close();
  };

  useEffect(() => {
    if (completionDate && toggleDate) {
      console.log(completion);
      console.log("toggle", completionDate);
      setEditMode(false);
      if (completion[format(toggleDate, "yyyy-MM-dd")]) {
        //set edit mode to true
        setEditMode(true);
        console.log("edit mode:", editMode);
        setInitialData({
          title: "",
          description: "",
          postToCommunities: true,
          communitiesPost: [],
          image: null,
        });
      }
      // console.log("edit mode:", editMode);
      document.getElementById(`my_modal_${taskId}`).showModal();
    }
  }, [completionDate, toggleDate, taskId]);

  return (
    <div className="collapse collapse-arrow bg-stone-100 transparent max-w-4xl shadow-xl bg-opacity-85">
      <CompletionModal
        completionDate={completionDate}
        toggleCompletion={toggleCompletion}
        completion={completion}
        toggleDate={toggleDate}
        habit={task}
        key={`my_modal_${taskId}`}
        modalId={`my_modal_${taskId}`}
        editMode={editMode}
        setToggleDate={setToggleDate}
        initialData={initialData}
      ></CompletionModal>
      <input type="checkbox" />
      <div className="collapse-title text-xl text-brown-light font-medium">
        {task.habitName}
      </div>
      <div className="collapse-content flex flex-col space-y-5">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name={task.habitName}
            role="tab"
            className="tab [--tab-bg:aliceblue] [--tab-border-color:#32292F]"
            aria-label="Week"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-[#f0f8ff] border-brown-dark rounded-box p-6"
          >
            <div className="flex flex-col items-center justify-evenly h-40 space-y-5">
              <div className="flex justify-center items-center">
                <button onClick={goToPreviousWeek}>{`<`}</button>
                <span
                  style={{
                    margin: "0 20px",
                  }}
                >
                  Week of {format(currentWeekStart, "MMM d, yyyy")}
                </span>
                <button onClick={goToNextWeek}>{`>`}</button>
              </div>
              <div className="flex flex-row justify-evenly w-4/5 items-center">
                {weekDates.map((date) => {
                  const formattedDate = format(date, "yyyy-MM-dd");

                  const isCompleted = !!completion[formattedDate];
                  return (
                    <div
                      key={formattedDate}
                      className="flex flex-col justify-center items-center w-1/7"
                    >
                      <div className="font-bold">{format(date, "EE")}</div>
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        className="checkbox w-8 h-8 border-2 border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
                        onChange={() => handleCheckbox(date)}
                      />
                      <div>{format(date, "d")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <input
            type="radio"
            name={task.habitName}
            role="tab"
            className="tab [--tab-bg:aliceblue]"
            aria-label="Month"
          />
          <div
            role="tabpanel"
            className="tab-content bg-[#f0f8ff] border-base-300 rounded-box p-6"
          >
            <div className="flex flex-col items-center justify-center space-y-5">
              <div className="flex justify-center items-center">
                <button onClick={goToPreviousMonth}>{`<`}</button>
                <span
                  style={{
                    margin: "0 20px",
                  }}
                >
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button onClick={goToNextMonth}>{`>`}</button>
              </div>
              <div
                className={`w-4/5 grid`}
                style={{
                  gridTemplateColumns: `repeat(${selectedDays.length}, minmax(0, 1fr))`,
                }}
              >
                {selectedDays.map((day) => (
                  <div
                    key={day}
                    className="flex flex-col justify-center items-center font-bold"
                  >
                    {day.slice(0, 3)}
                  </div>
                ))}
                {Array.from({
                  length: startOfMonth(currentMonth).getDay(),
                }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center"
                  ></div>
                ))}
                {monthDates.map((date) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const isCompleted = !!completion[formattedDate];
                  return (
                    <div
                      key={formattedDate}
                      className="flex flex-col justify-center items-center"
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        className="checkbox w-7 h-7 sm:w-8 sm:h-8 border-2 border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
                        onChange={() => handleCheckbox(date)}
                      />
                      <div className="text-sm">{format(date, "d")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <input
            type="radio"
            name={task.habitName}
            role="tab"
            className="tab [--tab-bg:aliceblue]"
            aria-label="Year"
          />
          <div
            role="tabpanel"
            className="tab-content bg-[#f0f8ff] border-base-300 rounded-box p-6"
          >
            <div className="flex flex-col items-center space-y-6">
              <div className="flex justify-center items-center">
                <button onClick={goToPreviousYear}>{`<`}</button>
                <span
                  style={{
                    margin: "0 20px",
                  }}
                >
                  {format(currentYear, "yyyy")}
                </span>
                <button onClick={goToNextYear}>{`>`}</button>
              </div>
              <div className="overflow-x-auto w-full">
                <div className="flex flex-wrap flex-col h-40">
                  {yearDates.map((date) => {
                    const formattedDate = format(date, "yyyy-MM-dd");
                    const isCompleted = !!completion[formattedDate];
                    const monthBox = format(date, "MM");
                    return (
                      <div
                        key={formattedDate}
                        className="flex flex-col justify-center p-px items-center"
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onMouseEnter={() => setMonthHover(format(date, "MM"))}
                          onMouseLeave={() => setMonthHover(null)}
                          className={`checkbox w-4 h-4 sm:w-5 sm:h-5 border-2 rounded-sm border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56] ${
                            monthHover == monthBox
                              ? "border-brown-light [--chkbg:#FF0000] [--chkfg:#FFFFFF]"
                              : "border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
                          }`}
                          // onChange={() => handleCheckbox(date)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Timeline></Timeline>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
