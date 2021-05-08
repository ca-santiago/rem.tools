import React, { useState } from 'react';
import VideoPreview from '../videoPreview';
import VideoRecorder from '../videoRecorder';

function FaceStep({ onCompleted }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [disabled, setDisabled] = useState(true);

  function onFileChange(data) {
    const file = data.target.files[0];
    if(file) { 
      setSelectedFile(file)
      setDisabled(false)
    } else {
      setSelectedFile(null)
      setDisabled(true)
    }
  }

  function submit() {
    return;
  }
  
  return (
    <>
      <h3 className="step-component-title">Validación con cámara</h3>
      <VideoRecorder />
      <input type="file" accept="video/mp4" onChange={onFileChange} />
      <button onClick={submit} disabled={disabled} >Completar</button>
      <div>
        { selectedFile && <VideoPreview file={selectedFile} /> }
      </div>
    </>
  );
}

export default FaceStep;
