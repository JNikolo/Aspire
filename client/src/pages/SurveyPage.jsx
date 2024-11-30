import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { useAuth } from "@clerk/clerk-react";

export const SurveyPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      habitName: "",
      frequency: [],
      notifications: false,
      selectedDays: [],
    },
  });

  const { habitId } = useParams();
  const isEditMode = Boolean(habitId);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  // watch is used to dynamically show/hide sections
  const notifications = watch("notifications", false);
  const frequency = watch("frequency", []);
  const [deleteHabit, setDeleteHabit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `http://127.0.0.1:3000/habit/${habitId}/survey`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("Habit data", data);
        const { habitName, frequency, notifications, selectedDays } = data;
        reset({
          habitName,
          frequency: frequency.map((f) => f.dayOfWeek),
          notifications,
          selectedDays: selectedDays.map((d) => d.dayOfWeek),
        });
      } catch (err) {
        console.error("Error during habit fetch:", err);
      }
    };

    if (isEditMode) {
      fetchHabit();
    }
  }, [isEditMode, habitId, getToken, reset]);

  const onSubmit = (data) => {
    // handle form submission
    console.log("submitted data", data);
    console.log("id", habitId);
    console.log("isEditMode", isEditMode);
    setLoading(true);

    const createHabit = async () => {
      try {
        const token = await getToken();
        await fetch("http://127.0.0.1:3000/habit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error("Error during habit creation:", err);
      }
    };

    const updateHabit = async () => {
      try {
        const token = await getToken();
        await fetch(`http://127.0.0.1:3000/habit/${habitId}/survey`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error("Error during habit update:", err);
      }
    };

    if (isEditMode) {
      // handle edit mode
      console.log("Edit Mode");
      updateHabit();
    } else {
      // handle create mode
      console.log("Create Mode");
      createHabit();
    }
    setLoading(false);
  };

  // Frequency of Habit
  // const handleFrequencyChange = (day) => {
  //   setFrequency(
  //     (prevSelectedDays) =>
  //       prevSelectedDays.includes(day)
  //         ? prevSelectedDays.filter((d) => d !== day) // Remove day if it's already selected
  //         : [...prevSelectedDays, day] // Add day if it's not selected
  //   );
  // };

  // Delete Habit
  const handleDeleteHabit = async () => {
    setDeleteHabit(true);
    try {
      const token = await getToken();
      const response = await fetch(`http://127.0.0.1:3000/habit/${habitId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete habit");
      }
    } catch (err) {
      console.error("Error during habit deletion:", err);
    }

    setDeleteHabit(false);
  };

  //const [habitName, setHabitName] = useState(null);
  // const [notifications, setNotifications] = useState(false);
  // const [selectedDays, setSelectedDays] = useState([]);

  // // Notification Preferences
  // const handleNotificationChange = () => {
  //   setNotifications((prevNotifications) => !prevNotifications);
  //   //{...register("notifications")}
  // };

  // // Handle individual day selection for notifications
  // const handleNotificationDaysChange = (day) => {
  //   setSelectedDays(
  //     (prevSelectedDays) =>
  //       prevSelectedDays.includes(day)
  //         ? prevSelectedDays.filter((d) => d !== day) // Remove day if it's already selected
  //         : [...prevSelectedDays, day] // Add day if it's not selected
  //   );
  // };

  return (
    <div className=" bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex items-center justify-center p-4">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg mx-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-700 font-medium">
              {isEditMode ? "Updating your habit..." : "Creating your habit..."}
            </p>
          </div>
        </div>
      )}
      {/* card from daisyui used to display content*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-stone-100 transparent card w-full max-w-4xl shadow-xl bg-opacity-85">
          <div className="card-body flex">
            {(isEditMode && (
              <>
                <h3 className="card-title text-brown-dark text-2xl font-bold mb-6">
                  Edit Your
                  <span className="text-[#93C5FD]">Habit </span>
                </h3>
                <h2 className="card-title text-[#32292F] text-2xl font-bold mb-6">
                  Please Take A Moment To Edit Your
                  <span className="text-[#93C5FD]">Habit </span>
                  Info
                </h2>
              </>
            )) || (
              <>
                <h3 className="card-title text-brown-dark text-2xl font-bold mb-6">
                  Let&apos;s Get Your
                  <span className="text-[#93C5FD]">Habit </span>
                  Ready!
                </h3>
                <h2 className="card-title text-[#32292F] text-2xl font-bold mb-6">
                  Please Take A Moment To Fill Out This Survey
                </h2>
              </>
            )}
            <hr className="my-1 border-t-4 border-[#60A5FA] w-full shadow-xl" />
            {/* Survey questions */}
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
                {...register("habitName", {
                  required: "Please enter a habit name",
                })}
                className="input input-bordered w-full rounded-md border-gray-300 bg-white focus:border-blue-500 text-black"
              />
              {errors.habitName && (
                <span className="text-red-600">{errors.habitName.message}</span>
              )}
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
                            value={day}
                            {...register("frequency", {
                              required: "Please select at least one day",
                            })}
                            // onChange={() => handleFrequencyChange(day)}
                            className="checkbox hidden peer"
                            //checked={frequency.includes(day)}
                          />
                          <span
                            className={`label-text btn btn-outline font-bold ${
                              frequency.includes(day)
                                ? "bg-blue-dark text-white"
                                : ""
                            }`}
                          >
                            {day}
                          </span>
                        </label>
                      </div>
                    )
                  )}
                </div>
                {errors.frequency && (
                  <span className="text-red-600">
                    Please select at least one day
                  </span>
                )}
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
                  {...register("notifications")}
                  className="toggle [--tglbg:white] bg-blue-dark"
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
                            value={day}
                            {...register("selectedDays", {
                              required: "Please select at least one day",
                            })}
                            className="radio hidden peer"
                          />
                          <span
                            className={`label-text btn btn-outline font-bold ${
                              watch("selectedDays")?.includes(day)
                                ? "bg-blue-dark text-white"
                                : ""
                            }`}
                          >
                            {day}
                          </span>
                        </label>
                      </div>
                    )
                  )}
                </div>
                {errors.selectedDays && (
                  <span className="text-red-600">
                    Please select at least one day
                  </span>
                )}
              </div>
            )}
            {/* Save Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn border-5 border-white bg-brown-dark hover:bg-brown-light hover:border-white  text-white"
              >
                Save Changes
              </button>
            </div>
            {/*Trash icon*/}
            {isEditMode && (
              <label
                htmlFor="my_modal_6"
                className="btn btn-outline px-3 absolute top-4 right-4 flex items-center text-black hover:border-5 hover:border-white"
              >
                <BsTrash3 size={20} /> Delete
              </label>
            )}
          </div>
        </div>
        {/* Delete Habit */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Habit</h3>
            <p className="py-4">Are you sure you want to delete this habit?</p>
            <div className="modal-action">
              <button
                className="btn text-black hover:bg-gray hover:text-white borrder-5 border-white"
                onClick={handleDeleteHabit}
              >
                <span>Delete</span>
              </button>
              <label
                htmlFor="my_modal_6"
                className="btn bg-blue-light text-black hover:bg-gray hover:text-white border-5 border-white"
              >
                <span>Cancel</span>
              </label>

              {/* <input
                type="checkbox"
                name="frequency"
                className="radio hidden peer"
                checked={deleteHabit}
                onChange={() => deleteUserHabit()}
              />
            </button>
            <label
              htmlFor="my_modal_6"
              className="btn text-white text-black hover:bg-gray hover:text-white borrder-5 border-white"
            >
              <span>Cancel</span>
              <input
                type="checkbox"
                name="frequency"
                className="radio hidden peer"
                checked={deleteHabit}
                onChange={() => deleteUserHabit()}
                disabled={fromSource}
              />
            </label> */}
            </div>
            {deleteHabit && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SurveyPage;
