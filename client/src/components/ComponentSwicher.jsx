import React from 'react';
import FormStep from '../components/steps/Form';
import FaceStep from '../components/steps/Face';
import SignatureStep from '../components/steps/Signature';

export default function StepSwitcher({ steps = [], currentKey, onStepCompleted }) {

  const child = steps.find(step => step === currentKey);

  function _stepCompleted(value) {
    onStepCompleted(value);
  }

  return (
    <div>
      { makeStepComponent(child, () => _stepCompleted(child)) }
    </div>
  );
}

function makeStepComponent(type, onComplete) {
  switch(type) {
    case "FACE": {
      return <FaceStep onCompleted={onComplete} />;
    }
    case "PERSONAL_DATA": {
      return  <FormStep onCompleted={onComplete} /> ;
    }
    case "SIGNATURE": {
      return <SignatureStep onCompleted={onComplete} />;
    }
    default: {
      return undefined;
    }
  }
}
