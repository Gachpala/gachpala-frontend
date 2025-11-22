"use client";

export default function ({ children, className }) {
  return (
    <div className={` ${className} w-full max-w-[1320px] mx-auto `}>
      {children}
    </div>
  );
}
