import React, { useMemo } from 'react';
import {
  FaIdCard,
  FaFileSignature,
  FaCamera
} from 'react-icons/fa';
import useRenderCounter from '../hooks/useRenderCounter';

export default function StepIndicator({ steps, currStep, onClickIndicator }) {

  const components = useMemo(() => steps.map(function(s) {
    const active = currStep === s ? "step-indicator-active" : "";
    return (
      <div
        onClick={() => onClickIndicator(s) }
        className={`step-indicator ${active}`}>
        { makeStepIcon(s) }
      </div>
    );
  }), [steps]);

  return (
    <>
      {
       components
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
