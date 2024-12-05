export const LoadingOverlay = ({ isVisible, message }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg mx-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};
