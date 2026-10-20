"use client";

import React, { forwardRef, useState, useId } from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelRight?: React.ReactNode;
  helperText?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      labelRight,
      helperText,
      error,
      showCount = false,
      maxLength,
      rows = 4,
      disabled = false,
      required = false,
      className = "",
      id,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const isError = Boolean(error);

    const [charCount, setCharCount] = useState(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full flex flex-col font-sans">
        {/* Label Header: Label Kiri & Label/Keterangan Kanan */}
        {(label || labelRight) && (
          <div className="flex items-center justify-between mb-2 select-none">
            {label && (
              <label
                htmlFor={textareaId}
                className="text-sm font-bold text-neutral-900"
              >
                {label}
                {required && (
                  <span className="text-status-destructive ml-1">*</span>
                )}
              </label>
            )}
            {labelRight && (
              <div className="text-xs text-neutral-500 font-medium">
                {labelRight}
              </div>
            )}
          </div>
        )}

        {/* Textarea Container Box */}
        <div
          className={`relative flex flex-col w-full rounded-xl bg-neutral-100 border transition-all duration-200 ${
            isError
              ? "border-status-destructive ring-1 ring-status-destructive/20 bg-status-destructive-bg/10"
              : "border-transparent focus-within:border-primary focus-within:bg-surface focus-within:ring-2 focus-within:ring-primary/15"
          } ${
            disabled
              ? "opacity-60 cursor-not-allowed select-none bg-neutral-200/50"
              : ""
          }`}
        >
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-invalid={isError}
            aria-describedby={
              isError
                ? `${textareaId}-error`
                : helperText
                ? `${textareaId}-helper`
                : undefined
            }
            className={`w-full bg-transparent py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none resize-y min-h-[96px] ${className}`}
            {...props}
          />
        </div>

        {/* Footer Row: Error / Helper Text di Kiri & Character Counter di Kanan */}
        <div className="flex items-center justify-between mt-1.5 gap-2">
          <div className="flex-1">
            {isError && (
              <p
                id={`${textareaId}-error`}
                className="text-xs text-status-destructive font-medium flex items-center gap-1"
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

            {!isError && helperText && (
              <p id={`${textareaId}-helper`} className="text-xs text-neutral-500">
                {helperText}
              </p>
            )}
          </div>

          {/* Character Counter Opsional */}
          {showCount && maxLength && (
            <div className="text-[11px] text-neutral-400 font-medium shrink-0">
              {charCount}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
