import React, { useState } from "react";

/**
 * Labelled input with an inline error/hint.
 * For type="password" it adds a Show/Hide toggle.
 */
const FormField = ({ id, label, type = "text", error, hint, ...inputProps }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const stateClasses = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          // text-base on mobile stops iOS Safari from zooming in on focus
          className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:outline-none focus:ring-4 sm:text-sm ${stateClasses} ${isPassword ? "pr-16" : ""}`}
          {...inputProps}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 focus:outline-none focus-visible:text-indigo-600"
          >
            {visible ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error ? (
        <p id={messageId} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
