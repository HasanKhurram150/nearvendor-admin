"use client";
import { ActiveStarIcon, StarIcon } from "@/icons";
import React, { useState } from "react";

interface FeaturedToggleProps {
  defaultValue?: boolean;
  onToggle?: (isFeatured: boolean) => void;
}

const FeaturedToggle: React.FC<FeaturedToggleProps> = ({
  defaultValue = false,
  onToggle,
}) => {
  const [isFeatured, setIsFeatured] = useState(defaultValue);

  const toggleFeatured = () => {
    const newValue = !isFeatured;
    setIsFeatured(newValue);
    onToggle?.(newValue);
  };

  return (
    <button
      onClick={toggleFeatured}
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
