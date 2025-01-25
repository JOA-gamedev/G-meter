import React from "react";
import { motion } from "framer-motion";

interface GaugeProps {
  value: number; // Value to display (0-100)
  max?: number; // Maximum value (default is 100)
  size?: number; // Diameter of the gauge in pixels
  strokeWidth?: number; // Thickness of the gauge arc
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  max = 100,
  size = 150,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half-circle circumference
  const progress = Math.min(value / max, 1) * circumference;

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size / 2 }}
    >
      <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} 
              A ${radius},${radius} 0 1,1 ${size - strokeWidth / 2},${
            size / 2
          }`}
          fill="none"
          stroke="#2d2d2d"
          strokeWidth={strokeWidth}
        />

        {/* Progress Arc */}
        <motion.path
          d={`M ${strokeWidth / 2},${size / 2} 
              A ${radius},${radius} 0 1,1 ${size - strokeWidth / 2},${
            size / 2
          }`}
          fill="none"
          stroke="#4ade80" // Tailwind green-400
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Value Text */}
      <div
        className="absolute text-white font-bold flex items-center justify-center"
        style={{ width: size, height: size / 2 }}
      >
        <span className="text-lg">{Math.round((value / max) * 100)}%</span>
      </div>
    </div>
  );
};

export default Gauge;
