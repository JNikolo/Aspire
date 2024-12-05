export const HabitNameInput = ({ register, errors }) => (
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
);
