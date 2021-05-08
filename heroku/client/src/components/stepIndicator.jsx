import React, { useMemo } from 'react';
import MakeStepIndicatorIcon from './makeStepIndicator';

export default function StepIndicator({ steps, currStep, onClickIndicator }) {

  const components = useMemo(() => steps.map(function(s, index) {
    const active = currStep === s ? "step-indicator-active" : "";
    return (
      <>
        <div
          onClick={() => onClickIndicator(s) }
          className={`step-indicator ${active}`}>
          { MakeStepIndicatorIcon(s) }
        </div>
        { index < steps.length -1 && <div className="step-line-union"></div> }
      </>
    );
  }), [steps, onClickIndicator, currStep]);

  return (
    <>
      {
       components
      }
    </>
  );
}


