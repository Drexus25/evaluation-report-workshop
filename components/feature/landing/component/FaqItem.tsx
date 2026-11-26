"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/libs/cn";

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
    <Card
      variant="default"
      padding="none"
      className="overflow-hidden transition-colors duration-150 ease-out hover:border-primary-200"
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        <span className="font-headline font-semibold text-xs sm:text-sm text-neutral-800">
          {question}
        </span>
        <div
          className={cn(
            "w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ease-out",
            isOpen ? "rotate-180 bg-primary-50 text-primary" : "text-neutral-500"
          )}
        >
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
          {answer}
        </div>
      )}
    </Card>
  );
};

export default FaqItem;
