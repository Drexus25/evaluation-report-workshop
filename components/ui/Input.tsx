"use client";

import React, { forwardRef, useState, useId } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelRight?: React.ReactNode;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelRight,
      helperText,
      error,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      type = "text",
      disabled = false,
      required = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const isError = Boolean(error);
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password" || showPasswordToggle;
    const currentType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full flex flex-col font-sans">
        {/* Label Header: Label Kiri & Label/Link Kanan */}
        {(label || labelRight) && (
          <div className="flex items-center justify-between mb-2 select-none">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-bold text-neutral-900"
              >
                {label}
                {required && <span className="text-status-destructive ml-1">*</span>}
              </label>
            )}
            {labelRight && (
              <div className="text-xs text-neutral-500 font-medium">
                {labelRight}
              </div>
            )}
          </div>
        )}

        {/* Input Container Box sesuai Desain Figma */}
        <div
          className={`relative flex items-center w-full rounded-xl bg-neutral-100 border transition-all duration-200 ${
            isError
              ? "border-status-destructive ring-1 ring-status-destructive/20 bg-status-destructive-bg/10"
              : "border-transparent focus-within:border-primary focus-within:bg-surface focus-within:ring-2 focus-within:ring-primary/15"
          } ${
            disabled
              ? "opacity-60 cursor-not-allowed select-none bg-neutral-200/50"
              : ""
          }`}
        >
          {/* Left Icon (misal Icon ID Card atau Gembok) */}
          {leftIcon && (
            <div className="absolute left-3.5 text-neutral-500 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={currentType}
            disabled={disabled}
            required={required}
            aria-invalid={isError}
            aria-describedby={
              isError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={`w-full bg-transparent py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none ${
              leftIcon ? "pl-11" : ""
            } ${isPasswordType || rightIcon ? "pr-11" : ""} ${className}`}
            {...props}
          />

          {/* Password Eye Toggle Icon */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3.5 text-neutral-500 hover:text-neutral-700 transition-colors p-1 cursor-pointer focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}

          {/* Right Custom Icon jika bukan password */}
          {!isPasswordType && rightIcon && (
            <div className="absolute right-3.5 text-neutral-500 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error State Display */}
        {isError && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-status-destructive mt-1.5 font-medium flex items-center gap-1"
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {/* Helper Text */}
        {!isError && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-neutral-500 mt-1.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
