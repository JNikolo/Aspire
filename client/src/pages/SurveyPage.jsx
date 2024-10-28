import React from "react";
import { useState } from "react";

export const SurveyPage = () => {
  const [habitName, setHabitName] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [notifications, setNotifications] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [privacy, setPrivacy] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Notifications
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

  //color picker

  // Define pastel colors
  const colors = [
    { name: "Soft Pink", hex: "#FFD1DC" },
    { name: "Light Lavender", hex: "#D7BDE2" },
    { name: "Pale Mint", hex: "#D5F5E3" },
    { name: "Sky Blue", hex: "#AED6F1" },
    { name: "Lemon Yellow", hex: "#FCF3CF" },
  ];
  //

  const [customColor, setCustomColor] = useState("#FFFFFF");

  const handleCustomColorChange = (event) => {
    const color = event.target.value;
    setCustomColor(color);
    setSelectedColor(color);
  };

  return (
    <div className="bg-gray min-h-screen flex items-center justify-center p-4">
      {/* card from daisyui used to display content*/}
      <div className="bg-blue-light card w-full max-w-4xl shadow-xl">
        <div className="card-body center">
          <h2 className="card-title text-brown-dark text-2xl font-bold mb-6">
            Let's Get Your Habit Ready!
          </h2>
          <h3 className="card-title text-brown-dark text-2xl font-bold mb-6">
            Please take a few moments to complete this survey
          </h3>
          <hr className="my-1 border-t-4 border-brown-dark w-full shadow-xl" />
          <form>
            {/* Survey questions */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-brown-dark label-text">
                  Choose a Name for Your Habit
                </span>
              </label>
              <input
                type="text"
                placeholder="Your answer"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 bg-white focus:border-blue-500"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-brown-dark label-text">
                  How Often Will You Work On Your Habit?
                </span>
              </label>
              {/* Frequency of Task, Daily or Weekly */}
              <div className="flex flex-row gap-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="frequency"
                      className="radio hidden peer"
                      value="daily"
                      required
                    />
                    <span className="label-text btn btn-outline bg-white hover:bg-blue-dark peer-checked:bg-blue-dark text-brown-dark shadow-xl">
                      Daily
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="frequency"
                      className="radio hidden peer"
                      value="weekly"
                    />
                    <span className="label-text btn btn-outline bg-white hover:bg-blue-dark peer-checked:bg-blue-dark text-brown-dark shadow-xl">
                      Weekly
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {/* Notifications Toggle */}
            <div className="form-control mb-4">
              <div className="flex items-center gap-4">
                <label className="label">
                  <span className="font-bold text-brown-dark label-text">
                    Do You Want to Receive Notifications?
                  </span>
                </label>
                <input
                  type="checkbox"
                  onChange={handleNotificationChange}
                  className="toggle bg-blue-dark [--tglbg:white]"
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
            {/* Public or Private Habit */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-brown-dark label-text">
                  Public or Private Profile?
                </span>
              </label>
              <div className="flex flex-row gap-2">
                {/* Public option */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      className="radio hidden peer"
                      checked={privacy === "public"}
                      onChange={() => setPrivacy("public")}
                    />
                    <span className="label-text btn btn-outline bg-white hover:bg-blue-dark peer-checked:bg-blue-dark text-brown-dark shadow-xl">
                      Public
                    </span>
                  </label>
                </div>
                {/* Private option */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="privacy"
                      value="private"
                      className="radio hidden peer"
                      checked={privacy === "private"}
                      onChange={() => setPrivacy("private")}
                    />
                    <span className="label-text btn btn-outline bg-white hover:bg-blue-dark peer-checked:bg-blue-dark text-brown-dark shadow-xl">
                      Private
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Theme Color Picker */}
            <div className="form-control mb-4">
              <label className="label text-brown-dark font-bold">
                Choose a Color:
              </label>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                      selectedColor === color.hex
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}

                {/* Custom Color Picker */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                      selectedColor === customColor
                        ? "border-gray"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: customColor }}
                  >
                    <i
                      className="fas fa-pencil-alt absolute text-black"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        fontSize: "1.25rem",
                      }}
                    />
                  </div>
                  <input
                    type="color"
                    value={customColor}
                    onChange={handleCustomColorChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Selected Color Display */}
            {/* {selectedColor && (
              <div
                className="mt-4 p-4 w-full max-w-xs rounded-lg shadow-lg"
                style={{ backgroundColor: selectedColor }}
              >
                <p className="text-center font-bold text-brown-dark">
                  Selected Color:{" "}
                  {colors.find((color) => color.hex === selectedColor)?.name ||
                    "Custom"}
                </p>
              </div>
            )} */}
            {/* Save Button */}
            <div className="form-control mt-6">
              <button className="btn bg-brown-dark hover:bg-brown-light text-white">
                Save Changes
              </button>
            </div>
          </form>

          {/*Trash can*/}
          <label
            htmlFor="my_modal_6"
            className="btn bg-red-800 btn-circle px-10 absolute bottom-4 right-4"
          >
            Trash Can
          </label>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
