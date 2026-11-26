import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  actionHref?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  actionText,
  actionHref,
}) => {
  const actionClassName =
    "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-700 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md";

  const actionContent = (
    <>
      <span>{actionText}</span>
      <ChevronRight
        className="w-3.5 h-3.5 transition-transform duration-150 ease-out group-hover:translate-x-1"
        aria-hidden="true"
      />
    </>
  );

  return (
    <Card
      variant="default"
      padding="md"
      className="bg-white flex flex-col justify-between hover:border-primary-300 hover:shadow-md transition-all duration-200 ease-out group"
    >
      <div>
        <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-200/40 text-primary flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary-100 transition-transform duration-150 ease-out">
          {icon}
        </div>

        <CardHeader className="p-0 pb-2 flex-col items-start gap-1">
          <CardTitle as="h3" className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors duration-150 ease-out">
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
        {actionHref ? (
          actionHref.startsWith("#") ? (
            <a href={actionHref} className={actionClassName}>
              {actionContent}
            </a>
          ) : (
            <Link href={actionHref} className={actionClassName}>
              {actionContent}
            </Link>
          )
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            {actionText}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
