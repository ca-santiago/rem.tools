import React, { useCallback, useMemo, useState } from 'react';
import StepIndicator from '../components/stepIndicator';
import StepSwitcher from '../components/ComponentSwicher';
import FaceStep from '../components/steps/Face';
import FormStep from '../components/steps/Form';
import SignatureStep from '../components/steps/Signature';

export default function useStepController({ steps }) {

  const [currStep, setCurrStep] = useState(steps[0]);
  const [completedSteps, setCompletedSteps] = useState([]);

  const clickIndicator = useCallback(function(value) {
    setCurrStep(value);
  },[]);

  const onStepCompleted = useCallback(function(value){
    console.log('Completing: ' + value);
    setCompletedSteps([...completedSteps, value]);
  }, [setCompletedSteps, completedSteps]);

  const Indicator = useMemo(() => () => (
    <StepIndicator 
      steps={steps}
      onClickIndicator={clickIndicator}
      currStep={currStep}
    />
  ),[steps, clickIndicator, currStep]);

  const stepsComponents = useMemo(()=> [
    { key: 'FACE', component: <FaceStep onCompleted={() => onStepCompleted('FACE')} />},
    { key: 'SIGNATURE', component: <SignatureStep  onCompleted={() => onStepCompleted('SIGNATURE')} />},
    { key: 'PERSONAL_DATA', component: <FormStep  onCompleted={() => onStepCompleted('PERSONAL_DATA')} />}
  ], [onStepCompleted]);

  const StepComponent = useMemo(() => () => (
    <StepSwitcher
      steps={stepsComponents}
      currentKey={currStep}
    />
  ),[stepsComponents, currStep]);

  return {
    Indicator,
    StepComponent,
  }
}
