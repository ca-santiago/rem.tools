import React, { useState } from 'react';
import './stepButton.css';

export default function SelectableStepButton({ title, icon, onSelectChange, disable }) {

  const [active, setActive] = useState(false);

  return (
    <>
      <div 
        onClick={() => {
          if(disable) return;
          setActive(!active)
          onSelectChange(!active)
        }}
        className={`selectable-step-container ${returnStyle(disable," step-disable")} ${returnStyle(active," step-active")}`}
      >
        <p className="step-title">{title}</p>
        {icon}
      </div>
    </>
  );
}

function returnStyle(bool, str) {
  return bool ? str : "";
}