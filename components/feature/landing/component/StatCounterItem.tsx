import React from "react";

export interface StatCounterItemProps {
  value: string;
  label: string;
  sublabel?: string;
}

export const StatCounterItem: React.FC<StatCounterItemProps> = ({
  value,
  label,
  sublabel,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4">
      <span className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 tracking-tight">
        {value}
      </span>
      <span className="text-xs sm:text-sm font-semibold text-neutral-700 mt-1">
        {label}
      </span>
      {sublabel && (
        <span className="text-[11px] text-neutral-400 mt-0.5">{sublabel}</span>
      )}
    </div>
  );
};

export default StatCounterItem;
