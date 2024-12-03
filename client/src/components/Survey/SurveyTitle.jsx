export const SurveyTitle = ({ isEditMode }) => {
  if (!isEditMode) {
    return (
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
    );
  }
  return (
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
  );
};
