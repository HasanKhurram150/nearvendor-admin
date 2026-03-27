import React, { ReactNode } from "react";

// Props for Table
interface TableProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  size?: "sm" | "md" | "lg";
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className = "", hoverable = true }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <table className={`w-full text-left border-collapse ${hoverable ? "table-hoverable" : ""} ${className}`}>
        {children}
      </table>
    </div>
  );
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className = "", sticky = true }) => {
  return (
    <thead className={`${sticky ? "sticky top-0 z-10 backdrop-blur-md" : ""} ${className}`}>
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className = "", hoverable = true }) => {
  return (
    <tr className={`group transition-colors duration-200 ${hoverable ? "hover:bg-white/[0.03]" : ""} ${className}`}>
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = "",
  colSpan,
  rowSpan,
  size = "md",
}) => {
  const CellTag = isHeader ? "th" : "td";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-3 py-4 text-sm",
    lg: "px-4 py-6 text-base",
  };

  return (
    <CellTag
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`${sizeClasses[size]} ${isHeader ? "font-semibold text-gray-400" : "text-gray-300"} ${className}`}
    >
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
