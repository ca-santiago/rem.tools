import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import SignaturePad from 'signature_pad';
import useQuery from '../../hooks/useQuery';
import { StepServices } from '../../services/steps';

import './signature.css';

function SignatureStep({ onCompleted }) {

  const { id } = useParams();
  const query = useQuery();

  const canvasRef = useRef();
  const [pad, setPad] = useState(null); 
  const [img, setImg] = useState(null);

  const onEndDrawing = useCallback(function() {
    if(!pad) return;
    const imgURL = pad.toDataURL("image/jpeg");
    setImg(imgURL);
  }, [pad]);

  useEffect(()=> {
    const _pad = new SignaturePad(canvasRef.current, { backgroundColor: 'white' });
    setPad(() => _pad);
    _pad.onEnd = () => onEndDrawing();
    return () => {}
  }, [canvasRef.current]);
  
  function submit() {
    if(!img) return;
    
    fetch(img)
      .then(res => res.blob())
      .then(fileData =>  StepServices.CreateSignature({
          file: fileData,
          filename: 'signature.jpg',
          flujoId: id,
          token: query.get('token')
        })
      )
      .then(()=> {
        onCompleted();
      })
      .catch(err => {
        console.log({err});
      })
  }

  function resetCanvas() {
    setImg(null);
    pad.clear();
  }

  return (
    <>
      <h3>Firma autógrafa</h3>
      <canvas ref={canvasRef} className="canvas-container"></canvas>
      <div>
        <button onClick={()=> resetCanvas()}>Restablecer</button>
      </div>
      <div>
        <button disabled={!img} onClick={()=> submit()}>Enviar</button>
      </div>
    </>
  );
}

export default SignatureStep;
