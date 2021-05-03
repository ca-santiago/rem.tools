import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import useQuery from '../hooks/useQuery';
import { FlujoServices } from '../services/flujo';
import StepResolutionView from './stepResolution';

export default function CompleteFlujoScreen() {
  const { id } = useParams();
  const query = useQuery();
  const history = useHistory();

  const [flujo, setFlujo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(!query.get('token')) history.push('/');
    
    FlujoServices.getFlujoById(id)
    .then((data) => data.json())
    .then((payload)=> {
      setFlujo(payload);
    })
    .catch(function() {
      // history.replace('/');
    })
    .finally(()=> {
      setLoading(false);
    })
  }, [])
  
  if(loading)
    return <p>Loading...</p>;

  
  if(!loading && flujo === null) 
    return <Link to="/"><p>Regresar</p></Link>;

  return (
    <>
      <div className="step-container">
        <StepResolutionView flujo={flujo} />
      </div>
    </>
  );
}
