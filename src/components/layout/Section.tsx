import React from "react";
import clsx from "clsx";

export const Section: React.FC<{
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}> = ({ id, children, className, containerClassName }) => {
  return (
    <section
      id={id}
      className={clsx(
        "section-viewport overflow-hidden flex-shrink-0 relative p-6 sm:p-8 lg:p-16 xl:p-[120px] pb-[calc(6rem+env(safe-area-inset-bottom))] xl:pb-[120px]",
        containerClassName
      )}
      style={{ transform: "translateZ(0)" }}
    >
      <div className={clsx("w-full h-full relative flex", className)}>
        {children}
      </div>
    </section>
  );
};
