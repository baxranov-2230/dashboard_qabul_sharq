import React from "react";

function HemisLogo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-xl font-bold">Student portal</span>
      {/*<span className="text-md ml-2">NSUMT</span>*/}
    </div>
  );
}

export default HemisLogo;
