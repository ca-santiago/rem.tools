import React, { useEffect, useState } from 'react';
import { FlujoServices } from '../services/flujo';
import MakeStepIndicatorIcon, { MakeStatusIcon } from './makeStepIndicator';

export default function FlujosList() {

  const [flujos, setFlujos] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    FlujoServices.GetFlujosPaginated()
    .then(({results}) => {
      console.log(results);
      setFlujos(results);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setTimeout(()=> {
        setLoading(false);
      }, 1000)
    });
  },[]);

  if(loading) return <p>Cargando flujos...</p>

  if(flujos.length < 1) return <p>No hay flujos disponibles</p>

  return (
    <>
      { flujos.map((item, index, arr) => renderFlujo(item,index,arr.length)) }
    </>
  );
}


function renderFlujo(flujo, index, totalLen) {
    const {} = flujo;

    return (
      <div key={flujo.id} className="flujo-card-container">
        <div className="flujo-data-container">
          <div className="flujo-body">
            <p>{new Date(flujo.createdAt).toDateString()}</p>
          </div>
          <div className="flujo-card-status">
            {MakeStatusIcon(flujo.status)}
          </div>
        </div>
        <div className="types-container">
          {
            flujo.types.map((item) => {
              return (
                <div className="type-icon-contaner">
                  {MakeStepIndicatorIcon(item)}
                </div>
              )
            })
          }
        </div>
        {
          index < totalLen - 1 ? 
          <div className="flujo-card-limiter">
          </div>
          : null
        }
      </div>
    );
}
