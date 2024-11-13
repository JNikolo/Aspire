// import { useState } from "react";

import { useSearchParams } from "react-router-dom";

export const DashboardPage = () => {
  const [daysDisplayed, setDaysDisplayed] = useState([]);
  const [weekOf, setWeekOf] = useState(null);
  const [tasksPerDay, setTasksPerDay] = useState(null);
  const [tasks, setTasks] = useState(null);
  return (
    <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-row items-center justify-center p-4">
      {/* Habit Selector */}
      {/* <ul className="basis-1/4 m-3 bg-stone-100 transparent menu w-full rounded-box shadow-xl bg-opacity-85 flex flex-col space-y-2">
        <li className="menu-title text-brown-dark text-2xl font-bold">My Habits</li>
        <hr className="my-1 border-t-2 border-[#86919C] w-full shadow-xl" />
        <li><a className="hover:bg-blue-light p-4 border-2 border-gray/20 text-brown-dark font-semibold hover:bg-brown-dark text-xl">Item 1</a></li>
        <li><a className="hover:bg-blue-light p-4 border-2 border-gray/20 text-brown-dark font-semibold text-xl">Item 2</a></li>
        
      </ul> */}
      {/* card from daisyui used to display content*/}
      <div className="collapse collapse-arrow bg-stone-100 transparent max-w-4xl shadow-xl bg-opacity-85">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Habit 1</div>
        <div className="collapse-content">
          <p>hello</p>
          <div>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox border-2 border-blue-light [--chkbg:#93C5FD] [--chkfg:#705D56]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
