import React from "react";

const SurveyPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      {/* card from daisyui used to display content*/}
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">
            Let's Get Your Habit Ready!
          </h2>
          <form>
            {/* Survey questions */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Choose a Name for Your Habit
                </span>
              </label>
              <input
                type="text"
                placeholder="Your answer"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold  text-white label-text">
                  How Often Will You Work On Your Habit?
                </span>
              </label>
              {/* user checks bubble for option */}
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Daily</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Weekly</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold  text-white label-text">
                  Do You Want to Receive Notifications?
                </span>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Yes</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">No</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold  text-white label-text">
                  When Do You Want to be Notified?
                </span>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Monday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Tuesday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Wednesday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Thursday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Friday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Saturday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Sunday</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-white  label-text">
                  Public or Private Profile?
                </span>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Public</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Private</span>
                  <input
                    type="radio"
                    name="frequency"
                    className="radio checked:bg-blue-400"
                  />
                </label>
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="font-bold text-white label-text">
                  Select a Color/Theme For Your Habit
                </span>
              </label>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>Select Color/Theme</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
