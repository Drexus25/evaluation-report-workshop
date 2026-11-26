"use client";

import React, { forwardRef, useState, useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/libs/cn";

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
      className,
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

        <div
          className={cn(
            "relative flex flex-col w-full rounded-xl bg-neutral-100 border transition-all duration-150",
            isError
              ? "border-status-destructive ring-1 ring-status-destructive/20 bg-status-destructive-bg/10"
              : "border-transparent focus-within:border-primary focus-within:bg-surface focus-within:ring-2 focus-within:ring-primary/15",
            disabled && "opacity-60 cursor-not-allowed select-none bg-neutral-200/50"
          )}
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
            className={cn(
              "w-full bg-transparent py-3 px-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none resize-y min-h-24",
              className
            )}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between mt-1.5 gap-2">
          <div className="flex-1">
            {isError && (
              <p
                id={`${textareaId}-error`}
                className="text-xs text-status-destructive font-medium flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </p>
            )}

            {!isError && helperText && (
              <p id={`${textareaId}-helper`} className="text-xs text-neutral-500">
                {helperText}
              </p>
            )}
          </div>

          {showCount && maxLength && (
            <div className="text-[11px] text-neutral-500 font-medium shrink-0">
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
