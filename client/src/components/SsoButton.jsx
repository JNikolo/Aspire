import PropTypes from "prop-types";

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

SsoButton.propTypes = {
  provider: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
