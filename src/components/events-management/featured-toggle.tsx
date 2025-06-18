"use client";
import { ActiveStarIcon, StarIcon } from "@/icons";
import React from "react";

interface FeaturedToggleProps {
  isFeatured?: boolean;
  onToggle?: () => void;
}

const FeaturedToggle: React.FC<FeaturedToggleProps> = ({
  isFeatured = false,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center p-2 rounded-full transition-colors duration-300"
    >
      {/* <span className="mr-2 font-medium">
        {isFeatured ? "Featured" : "Mark as Featured"}
      </span> */}
      {isFeatured ? <ActiveStarIcon /> : <StarIcon />}
    </button>
  );
};

export default FeaturedToggle;
