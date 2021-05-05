import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SelectableStepButton from '../components/stepButtons';
import useFlujoCreator from '../hooks/useFlujoCreator';
import { FlujoServices } from '../services/flujo';
import {
  FaIdCard,
  FaFileSignature,
  FaCamera
} from 'react-icons/fa';


export default function CreateFlujoScreen() {
  const history = useHistory();
  const [disable, setDisable] = useState(false);
  const flujoCreator = useFlujoCreator();

  function toggleSelectStep(name) {
    return function(active) {
      if(active) {
        flujoCreator.addStep(name);
      } else {
        flujoCreator.removeStep(name)
      }
    }
  }

  function triggerCreate() {
    if(disable) return;
    setDisable(true);

    // Get State
    const {selected} = flujoCreator.getState();

    // Perform creation
    FlujoServices.createNewFlujo(selected)
    .then((data)=> data.json())
    .then((payload)=> {
      const {id,token} = payload;
      history.push(`/flujo/${id}?token=${token}`);
      setDisable(false);
    })
    .catch(()=> {
      console.log('Got an error while creating flujo');
    });
  }

  const submitStyle = !flujoCreator.canCreate ? "btn-disabled" : "";

  return (
    <div className="home-main-contaner">
      <h2 className="home-title">Create a new flujo</h2>
      <div className="selectable-container">
        <SelectableStepButton
          title="Validación con cámara"
          onSelectChange={toggleSelectStep('FACE')}
          icon={<FaCamera />}
        />
        <SelectableStepButton
          title="Formulario"
          onSelectChange={toggleSelectStep('PERSONAL_DATA')}
          icon={<FaIdCard />}
          />
        <SelectableStepButton
          title="Firma autógrafa"
          onSelectChange={toggleSelectStep('SIGNATURE')}
          icon={<FaFileSignature />}
        />
      </div> 
      {flujoCreator.canCreate == false && <p>Seleciona almenos uno</p>}
      <button disabled={!flujoCreator.canCreate} className={`createflow-button ${submitStyle}`} onClick={triggerCreate}>Create</button>
    </div>
  );
}
