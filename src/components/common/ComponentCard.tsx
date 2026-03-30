import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  headerActions?: React.ReactNode; // Actions to display in the header
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  headerActions,
}) => {
  return (
    <div
      className={`dashboard-card ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-[#1D1C1C] bg-white/[0.02] flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
        {headerActions && (
          <div className="flex items-center gap-3">
            {headerActions}
          </div>
        )}
      </div>


      {/* Card Body */}
      <div className="p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
