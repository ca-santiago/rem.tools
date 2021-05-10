import React, { useMemo } from 'react';
import MakeStepIndicatorIcon from './makeStepIndicator';

import { FaCheck, FaCheckCircle } from 'react-icons/fa';

import './stepindicator.css';

export default function StepIndicator({ steps, currStep, onClickIndicator, completedSteps }) {

  const components = useMemo(() => steps.map(function(s, index) {
    const active = currStep === s ? "active" : "";
    const completed = completedSteps.includes(s);
    return (
      <div key={s} className="indicator-step-container">
        { completed && <FaCheckCircle className="completed-icon" />}
        <div
          onClick={() => onClickIndicator(s) }
          className={`step-indicator ${active}`}>
          { MakeStepIndicatorIcon(s) }
        </div>
        { index < steps.length -1 && <div className="step-line-union"></div> }
      </div>
    );
  }), [steps, onClickIndicator, currStep, completedSteps]);

  return (
    <>
      {
       components
      }
    </>
  );
}


