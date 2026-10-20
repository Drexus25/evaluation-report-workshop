import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import RoleBadge, { RoleBadgeVariant } from "@/components/ui/RoleBadge";

export interface StepCardProps {
  stepNumber: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  footerBadge: string;
  badgeVariant?: RoleBadgeVariant;
}

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  icon,
  title,
  description,
  footerBadge,
  badgeVariant,
}) => {
  return (
    <Card
      variant="default"
      padding="md"
      className="bg-white flex flex-col justify-between hover:border-primary-300 hover:shadow-md transition-all duration-200 group relative"
    >
      <div>
        {/* Step Badge & Top Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-full bg-primary text-white font-headline font-bold text-sm flex items-center justify-center shadow-xs">
            {stepNumber}
          </div>
          <div className="w-9 h-9 rounded-xl bg-neutral-100/80 text-neutral-500 flex items-center justify-center group-hover:text-primary transition-colors">
            {icon}
          </div>
        </div>

        <CardHeader className="p-0 pb-2 flex-col items-start gap-1">
          <CardTitle as="h3" className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 pt-1">
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </div>

      <CardFooter className="p-0 pt-5 mt-4 border-t border-neutral-100">
        <RoleBadge variant={badgeVariant || "staff"} size="sm">
          {footerBadge}
        </RoleBadge>
      </CardFooter>
    </Card>
  );
};

export default StepCard;
