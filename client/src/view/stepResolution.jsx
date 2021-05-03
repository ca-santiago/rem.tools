import React from 'react';
import useStepResolver from '../hooks/useStepCreator';

export default function StepResolutionView({flujo}) {

  const Resolver = useStepResolver({ steps: flujo.types });

  return (
    <>
      <div className="steps-available-container">
          <Resolver.Indicator/>
      </div>
      <div className="current-step-container">
          <Resolver.StepComponent/>
      </div>
    </>
  );
}
