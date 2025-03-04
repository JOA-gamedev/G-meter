"use client";

import React from "react";
import { motion } from "framer-motion";

interface GaugeProps {
  value?: number; // Value to display (0-100)
  max?: number; // Maximum value (default is 100)
  size?: number; // Diameter of the gauge in pixels
  strokeWidth?: number; // Thickness of the gauge arc
  startColor?: string; // Start color for the progress arc
  endColor?: string; // End color for the progress arc
  halfwayColor?: string; // Optional color at the halfway point of the gradient
  textSize?: string; // Font size for the value text
  showText?: boolean; // Whether to display the text inside the gauge
  customText?: string; // Custom text to display instead of the percentage
}

export const Gauge: React.FC<GaugeProps> = ({
  value = 0,
  max = 100,
  size = 150,
  strokeWidth = 12,
  startColor = "#4ade80", // Default start color (green-400)
  endColor = "#f87171", // Default end color (red-400)
  halfwayColor = "#000000", // Optional halfway color
  textSize = "text-lg", // Default text size
  showText = true, // Show text by default
  customText = "", // No custom text by default
}) => {
  const radius = (size - strokeWidth) / 2;
  const startAngle = -120; // Start angle for the arc
  const endAngle = 120; // End angle for the arc
  const circumference = ((endAngle - startAngle) / 360) * 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1) * circumference;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1, // Counter-clockwise direction for the arc
      end.x,
      end.y,
    ].join(" ");
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size / 2 }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Arc */}
        <path
          d={describeArc(size / 2, size / 2, radius, startAngle, endAngle)}
          fill="none"
          stroke="#2d2d2d"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <motion.path
          d={describeArc(size / 2, size / 2, radius, startAngle, endAngle)}
          fill="none"
          stroke={`url(#gradient)`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="50%" stopColor={halfwayColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>

      {/* Value or Custom Text */}
      {showText && (
        <div
          className={`absolute text-white font-bold flex flex-col gap-4 items-center justify-center ${textSize}`}
          style={{ width: size, height: size / 2 }}
        >
          <span>{customText}</span>
          {/* <span>{Math.round((value / max) * 100) + "%"}</span> */}
          <span>{value}</span>
        </div>
      )}
    </div>
  );
};

export default Gauge;
