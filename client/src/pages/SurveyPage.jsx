import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import { useAuth } from "@clerk/clerk-react";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { SurveyTitle } from "../components/Survey/SurveyTitle";
import { HabitNameInput } from "../components/Survey/HabitNameInput";
import { CheckboxGroup } from "../components/Survey/SurveyCheckboxGroup";
import {
  fetchHabit,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../services/HabitServices";

export const SurveyPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
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
  const [loading, setLoading] = useState(null);
  // watch is used to dynamically show/hide sections
  const notifications = watch("notifications", false);
  const frequency = watch("frequency", []);
  const selectedDays = watch("selectedDays", []);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      setLoading("fetching");
      fetchHabit(habitId, reset, getToken)
        .then(() => setLoading(null))
        .catch(() => setLoading(null));
    }
  }, [isEditMode, habitId, getToken, reset]);

  useEffect(() => {
    if (!notifications) {
      setValue("selectedDays", []);
    }
  }, [notifications, setValue]);

  const onSubmit = (data) => {
    // handle form submission
    if (isEditMode) {
      // handle edit mode
      console.log("Edit Mode");
      setLoading("editing");
      updateHabit(getToken, habitId, data, navigate)
        .then(() => setLoading(null))
        .catch(() => setLoading(null));
    } else {
      // handle create mode
      console.log("Create Mode");
      setLoading("creating");
      createHabit(getToken, data, navigate)
        .then(() => setLoading(null))
        .catch(() => setLoading(null));
    }
  };

  // Delete Habit
  const handleDeleteHabit = async () => {
    setLoading("deleting");
    deleteHabit(habitId, getToken, navigate)
      .then(() => setLoading(null))
      .catch(() => setLoading(null));
  };

  return (
    <div className=" bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex items-center justify-center p-4">
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={loading !== null}
        message={
          loading === "fetching"
            ? "Fetching your habit..."
            : loading === "updating"
            ? "Updating your habit..."
            : loading === "creating"
            ? "Creating your habit..."
            : loading === "editing"
            ? "Saving your habit..."
            : "Deleting your habit..."
        }
      />
      {/* card from daisyui used to display content*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-stone-100 transparent card w-full max-w-4xl shadow-xl bg-opacity-85">
          <div className="card-body flex">
            <SurveyTitle isEditMode={isEditMode} />
            <hr className="my-1 border-t-4 border-[#60A5FA] w-full shadow-xl" />
            {/* Survey questions */}
            {/* Habit Name */}
            <HabitNameInput register={register} errors={errors} />
            {/* Frequency of Habit*/}
            <CheckboxGroup
              labelText="How Often Would You Like to Do This Habit?"
              options={["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]}
              register={register}
              name="frequency"
              selected={frequency}
              error={errors.frequency?.message}
              isRequired={true}
            />
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
              <CheckboxGroup
                labelText="On Which Days Would You Like to Receive Notifications?"
                options={["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]}
                register={register}
                name="selectedDays"
                selected={selectedDays}
                error={errors.selectedDays?.message}
              />
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SurveyPage;
