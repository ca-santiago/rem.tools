import React, { useMemo, useState } from 'react';

export default function StepSwitcher({ steps, currentKey }) {

  const currComponent = useMemo(() => steps.find(s => {
    return s.key === currentKey;
  }), [steps]);

  if(currComponent) return currComponent.component;
  return null;
}