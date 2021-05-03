import React, { memo } from 'react';

function FormStep({onCompleted}) {
  return (
    <>
      <p onClick={() => onCompleted()}>Form</p>
    </>
  );
}

export default memo(FormStep);
