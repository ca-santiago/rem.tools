import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router';

/*
 * Hooks
 */
import useQuery from '../../hooks/useQuery';

/*
 * Services 
 */
import { StepServices } from '../../services/steps';

/*
 * Components
 */
import PlaceSelector from '../placeSelector';
import PhoneInput  from 'react-phone-number-input/input';

import './form.css';

function FormStep({ onCompleted }) {

  const { id } = useParams();
  const query = useQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const canSubmit = useMemo(() => {
    return errors && Object.keys(errors).length === 0;
  }, [errors]);

  function submitForm(data) {
    StepServices.CreatePersonalData({
      birthDate: data.birthdate,
      bornPlace: data.place,
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      flujoId: id,
      token: query.get('token'),
    })
    .then(payload => {
      console.log({ payload });
      onCompleted();
    })
    .catch(err => {})
  }
  
  return (
    <>
      <h3>Formulario de datos personales</h3>
      <div className="form-container">
        <div className="input-group">
          <input
            className={`form-input ${errors.fullname ? "form-input-error": ""}`}
            {
              ...register("fullname", {
                required: true,
                maxLength: 64, 
              })
            }
            placeholder="Eje: Carmen Santiago"
            />
          {errors.fullname && <p className="input-error">Requerido</p>}
        </div>
        <div className="input-group">
          <Controller 
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                placeholder="Enter phone number"
                className={`form-input ${errors.phone ? "form-input-error": ""}`}
                placeholder="Celular"
                onChange={field.onChange}
                value={field.value}
              />
              )}
          />
          {errors.phone && <p className="input-error">Requerido</p>}
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="birthdate">Correo</label>
          <input 
            className={`form-input ${errors.email ? "form-input-error": ""}`}
            {...register("email", {
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }) }
            autoComplete="email" placeholder="example@mail.com" 
            type="email"
            />
          {errors.email && <p className="input-error">Introduzca un email valido</p>}
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="birthdate">Fecha de nacimiento</label>
          <input 
            className={`form-input ${errors.birthdate ? "form-input-error": ""}`}
            {
              ...register("birthdate", {
                 required: true
                })
            }
            type="date" placeholder="birth date" 
            />
          {errors.birthdate && <p className="input-error">Requerido</p>}
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="place">Lugar de nacimiento</label>
          <Controller
            name="place"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
                <PlaceSelector 
                  inputStyle={`form-input ${errors.place ? "form-input-error": ""}`}
                  containerStyle="place-selector-container"
                  {...field} />
              )}
          />
          {errors.place && <p className="input-error">Seleccione una lugar</p>}
        </div>
        <button
          className={`form-submit ${canSubmit ? "": "form-submit-disabled"}`}
          onClick={handleSubmit(submitForm)}
        >Enviar</button>
      </div>
    </>
  );
}

export default FormStep;
