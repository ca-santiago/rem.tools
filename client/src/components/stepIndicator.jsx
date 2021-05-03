import React from 'react';
import {
  FaIdCard,
  FaFileSignature,
  FaCamera
} from 'react-icons/fa';

export default function StepIndicator({ steps, currStep, onClickIndicator }) {

  function renderStep(s) {
    const active = currStep === s ? "step-indicator-active" : "";
    return (
      <p
        onClick={() => onClickIndicator(s) }
        className={`step-indicator ${active}`}>
        { makeStepIcon(s)}
      </p>
    );
  }

  return (
    <>
      {
        steps.map(renderStep)
      }
    </>
  );
}

function makeStepIcon(type) {
  switch(type) {
    case "FACE": {
      return <FaCamera />;
    }
    case "PERSONAL_DATA": {
      return <FaIdCard />;
    }
    case "SIGNATURE": {
      return <FaFileSignature />;
    }
    default: {
      return undefined;
    }
  }
}
