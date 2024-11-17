import { LuEye, LuEyeOff, LuAlertCircle } from "react-icons/lu";
import PropTypes from "prop-types";

export const FormInput = ({
  label,
  id,
  type,
  placeholder,
  registerOptions,
  error,
  icon,
  isPassword,
  showPassword,
  togglePassword,
  disabled,
}) => (
  <div className="w-full max-w-md mx-auto mb-6">
    <label htmlFor={id} className="text-sm text-gray-600 mb-1 block">
      {label}
    </label>
    <div className="relative form-control">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        id={id}
        placeholder={placeholder}
        className={`input input-bordered w-full pr-10
          ${error ? "input-error" : ""} 
          ${disabled ? "input-disabled" : ""}`}
        disabled={disabled}
        {...registerOptions}
      />
      {isPassword ? (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={togglePassword}
        >
          {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
        </button>
      ) : (
        icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )
      )}
    </div>
    {error && (
      <div className="alert alert-error mt-2 py-2 pl-4 pr-2 min-h-0 h-auto">
        <LuAlertCircle className="h-5 w-5" />
        <span className="text-sm">{error.message}</span>
      </div>
    )}
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  registerOptions: PropTypes.object.isRequired,
  error: PropTypes.object,
  icon: PropTypes.node,
  isPassword: PropTypes.bool,
  showPassword: PropTypes.bool,
  togglePassword: PropTypes.func,
  disabled: PropTypes.bool,
};
