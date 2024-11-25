import { useState } from "react";
import trash from "../assets/trash.png";
import { useLocation } from "react-router-dom";

export const SurveyPage = () => {
  const [habitName, setHabitName] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [frequency, setFrequency] = useState([]);
  const [notifications, setNotifications] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [deleteHabit, setDeleteHabit] = useState(false);
  const navigate = useLocation();
  const fromSource = navigate.state?.fromSource;

  // Frequency of Habit
  const handleFrequencyChange = (day) => {
    setFrequency(
      (prevSelectedDays) =>
        prevSelectedDays.includes(day)
          ? prevSelectedDays.filter((d) => d !== day) // Remove day if it's already selected
          : [...prevSelectedDays, day] // Add day if it's not selected
    );
  };

  // Notification Preferences
  const handleNotificationChange = () => {
    setNotifications((prevNotifications) => !prevNotifications);
  };

  // Handle individual day selection for notifications
  const handleNotificationDaysChange = (day) => {
    setSelectedDays(
      (prevSelectedDays) =>
        prevSelectedDays.includes(day)
          ? prevSelectedDays.filter((d) => d !== day) // Remove day if it's already selected
          : [...prevSelectedDays, day] // Add day if it's not selected
    );
  };

  // Delete Habit
  const deleteUserHabit = () => {
    setDeleteHabit(true);
  };

  return (
    <div className=" bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex items-center justify-center p-4">
      {/* card from daisyui used to display content*/}
      <div className="bg-stone-100 transparent card w-full max-w-4xl shadow-xl bg-opacity-85">
        <div className="card-body flex">
          <h3 className="card-title text-brown-dark text-2xl font-bold mb-6">
            Let&apos;s Get Your
            <span className="text-[#93C5FD]">Habit </span>
            Ready!
          </h3>
          <h2 className="card-title text-[#32292F] text-2xl font-bold mb-6">
            Please Take A Moment To Fill Out This Survey
          </h2>
          <hr className="my-1 border-t-4 border-[#60A5FA] w-full shadow-xl" />
          <form>
            {/* Survey questions */}
            {/* Profile Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-brown-dark label-text">
                  Choose a Profile Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Your Profile Name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 bg-white focus:border-blue-500 text-black"
                required
              />
            </div>
            {/* Habit Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-brown-dark label-text">
                  Choose a Name for Your Habit
                </span>
              </label>
              <input
                type="text"
                placeholder="Your Habit Name"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 bg-white focus:border-blue-500 text-black"
                required
              />
            </div>
            {/* Frequency of Habit*/}
            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-brown-dark label-text">
                  How Often Would You Like to Work On This Habit?
                </span>
              </label>
              <div className="form-control mb-4">
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div key={day} className="form-control">
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            className="checkbox hidden peer"
                            checked={frequency.includes(day)}
                            onChange={() => handleFrequencyChange(day)}
                            required
                          />
                          <span
                            className={`label-text btn btn-outline bg-white hover:bg-blue-dark peer-checked:bg-blue-dark text-brown-dark shadow-xl`}
                          >
                            {day}
                          </span>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            {/* Notifications Toggle */}
            <div className="form-control mb-4">
              <div className="flex items-center gap-4">
                <label className="label">
                  <span className="font-bold text-brown-dark label-text">
                    Do You Want to Receive Notifications For This Habit?
                  </span>
                </label>
                <input
                  type="checkbox"
                  onChange={handleNotificationChange}
                  className="toggle [--tglbg:white] bg-blue-dark"
                  checked={notifications}
                />
              </div>
            </div>
            {/* Notification Days Checkboxes */}
            {notifications && (
              <div className="form-control mb-4">
                <label className="label">
                  <span className="font-bold text-brown-dark label-text">
                    When Do You Want to be Notified?
                  </span>
                </label>
                <div className="flex flex-row gap-2">
                  {["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div key={day} className="form-control">
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            name="frequency"
                            className="radio hidden peer"
                            checked={selectedDays.includes(day)}
                            onChange={() => handleNotificationDaysChange(day)}
                          />
                          <span className="label-text px-4 btn btn-circle btn-outline bg-white hover:bg-blue-dark peer-checked:bg-blue-dark text-brown-dark shadow-xl">
                            {day}
                          </span>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {/* Save Button */}
            <div className="form-control mt-6">
              <button className="btn bg-brown-dark hover:bg-brown-light text-white">
                Save Changes
              </button>
            </div>
          </form>
          {/*Trash icon*/}
          <label
            htmlFor="my_modal_6"
            className="btn bg-red-600 btn-circle px-3 absolute top-4 right-4 flex items-center hover:bg-red-800"
          >
            <img src={trash} alt="Delete" className="w-12" />
          </label>
        </div>
      </div>
      {/* Delete Habit */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Delete Habit</h3>
          <p className="py-4">Are you sure you want to delete this habit?</p>
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn bg-blue-light text-black hover:bg-gray"
            >
              <span>Yes</span>
              <input
                type="checkbox"
                name="frequency"
                className="radio hidden peer"
                checked={deleteHabit}
                onChange={() => deleteUserHabit()}
              />
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn bg-blue-300 text-black hover:bg-gray"
            >
              <span>No</span>
              <input
                type="checkbox"
                name="frequency"
                className="radio hidden peer"
                checked={deleteHabit}
                onChange={() => deleteUserHabit()}
                disabled={fromSource}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
