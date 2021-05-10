import React, { useEffect, useState } from 'react';
import { FlujoServices } from '../services/flujo';
import MakeStepIndicatorIcon, { MakeStatusIcon } from './makeStepIndicator';

export default function FlujosList() {

  const [flujos, setFlujos] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    FlujoServices.GetFlujosPaginated()
    .then(({results}) => {
      setFlujos(results);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if(loading) return <p>Cargando flujos...</p>

  if(flujos.length < 1) return <p>No hay flujos disponibles</p>

  return (
    <>
      { flujos.map((item, index, arr) => renderFlujo(item, index, arr.length)) }
    </>
  );
}

function renderFlujo(flujo, index, totalLen) {
    const { id, createdAt, status, types} = flujo;
    return (
      <div key={id} key={createdAt} className="flujo-card-container">
        <div className="flujo-data-container">
          <div className="flujo-body">
            <p>{new Date(createdAt).toDateString()}</p>
          </div>
          <div className="flujo-card-status">
            {MakeStatusIcon(status)}
          </div>
        </div>
        <div className="types-container">
          {
            types.map(FlujoStepIcon)
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

function FlujoStepIcon(item) {
  return (
    <div key={item} className="type-icon-contaner">
    {MakeStepIndicatorIcon(item)}
    </div>
  );
}