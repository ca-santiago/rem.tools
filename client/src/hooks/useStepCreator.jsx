import React, { useState } from 'react';
import StepIndicator from '../components/stepIndicator';
import StepSwitcher from '../components/ComponentSwicher';

export default function useStepCreator({ steps }) {

  const [currStep, setCurrStep] = useState(steps[0]);
  const [completedSteps, setCompletedSteps] = useState([]);

  function clickIndicator(value) {
    setCurrStep(value);
  }

  function onStepCompleted(value) {
    console.log('Completing: ' + value);
    setCompletedSteps([...completedSteps, value]);
  }

  const Indicator = () => (
    <StepIndicator 
      steps={steps}
      onClickIndicator={clickIndicator}
      currStep={currStep}
    />
  );

  const StepComponent = () => (
    <StepSwitcher
      steps={steps}
      onStepCompleted={onStepCompleted}
      currentKey={currStep}
    />
  );

  return {
    Indicator,
    StepComponent,
  }
}
