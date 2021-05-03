import React, { memo } from 'react';

function SignatureStep({ onCompleted }) {
  return (
    <>
      <p onClick={onCompleted}>Signature</p>
    </>
  );
}

export default memo(SignatureStep);
