"use client";

import React, { forwardRef, useState, useId } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/libs/cn";

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
      className,
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

        <div
          className={cn(
            "relative flex items-center w-full rounded-xl bg-neutral-100 border transition-all duration-150",
            isError
              ? "border-status-destructive ring-1 ring-status-destructive/20 bg-status-destructive-bg/10"
              : "border-transparent focus-within:border-primary focus-within:bg-surface focus-within:ring-2 focus-within:ring-primary/15",
            disabled && "opacity-60 cursor-not-allowed select-none bg-neutral-200/50"
          )}
        >
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
            className={cn(
              "w-full bg-transparent py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none",
              Boolean(leftIcon) && "pl-11",
              (isPasswordType || Boolean(rightIcon)) && "pr-11",
              className
            )}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-neutral-500 hover:text-neutral-700 transition-colors p-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          )}

          {!isPasswordType && rightIcon && (
            <div className="absolute right-3.5 text-neutral-500 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {isError && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-status-destructive mt-1.5 font-medium flex items-center gap-1"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

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
