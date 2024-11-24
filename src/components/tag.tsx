import React from "react";

enum ColorVariants {
  blueDark = "bg-blue-dark",
  success = "bg-success",
  gray300 = "bg-gray-300",
  gray400 = "bg-gray-400",
}

interface TagProps {
  color: keyof typeof ColorVariants;
  children: React.ReactNode;
}

export function Tag({ color, children }: TagProps) {
  const colorClass = ColorVariants[color];

  return (
    <div
      className={`label-sm items-center justify-center rounded-full px-2 py-1 text-white ${colorClass}`}
    >
      {children}
    </div>
  );
}
