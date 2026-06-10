import React, { useMemo, useState } from "react";
import { SideNavigation } from "./SideNavigation";
import { motion } from "framer-motion";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState("persona");

  const handleNavigate = (id: string) => {
    setActiveSection(id);
  };

  const sectionOrder = useMemo(
    () => ["persona", "pos-matrix", "scene-simulation", "ai-productivity", "operations"],
    []
  );
  
  const activeIndex = Math.max(0, sectionOrder.indexOf(activeSection));

  const childrenArray = React.Children.toArray(children);

  return (
    <div className="fixed inset-0 app-viewport bg-background text-foreground overflow-hidden">
      <SideNavigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      <div className="w-full h-full overflow-hidden">
        <div
          className="h-full flex transition-transform duration-500 ease-out will-change-transform"
          style={{ 
            width: `${childrenArray.length * 100}dvw`,
            transform: `translate3d(-${activeIndex * 100}dvw, 0, 0)`
          }}
        >
          {childrenArray}
        </div>
      </div>
    </div>
  );
};
