"use client";

import React, { useState } from "react";

export interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-xs overflow-hidden transition-colors hover:border-primary-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
      >
        <span className="font-headline font-semibold text-xs sm:text-sm text-neutral-800">
          {question}
        </span>
        <div
          className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 bg-primary-50 text-primary" : "text-neutral-500"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 animate-fadeIn">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FaqItem;
