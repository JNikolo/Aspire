export const SsoButton = ({ provider, icon, handleSubmit, disabled }) => (
  <button
    className="btn btn-outline w-full h-12 mb-3 normal-case"
    onClick={handleSubmit}
    disabled={disabled}
  >
    {icon}
    <span className="text-gray-600 font-medium">Continue with {provider}</span>
  </button>
);
