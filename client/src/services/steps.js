import axios from 'axios';
import Form from '../components/steps/Form';

const baseURL = 'http://localhost:3300/flujos';


function CreateFaceId({ flujoId, token, file, filename }) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set('accessToken', token);
    form.append('file', file, filename);
    fetch(`${baseURL}/${flujoId}/steps/faceid`, form)
      .then((result) => {
        console.log('File creation result');
        console.log({ result });
        if (result.ok) {
          return resolve();
        }
        reject();
      })
      .catch(reject)
  });
}

function CreatePersonalData({ token, flujoId, email, fullname, birthDate, bornPlace, phone }) {
  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/${flujoId}/steps/signature`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: token, fullname, birthDate,
        bornPlace, phone, email,
      }),
    })
      .then(res => {
        console.log('Result of putting personal data: ');
        console.log({ res });

        if (res.ok == false) reject();
      })
      .catch(reject);
  });
}

function CreateSignature({ flujoId, token, file, filename }) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set('accessToken', token);
    form.append('file', file, filename);

    axios.put(`${baseURL}/${flujoId}/steps/signature`, form)
      .then((result) => {
        // TODO: Remove logs
        // console.log('Signature creation result');
        // console.log({ result });
        if (result.status == 400) {
          result.json().then(payload => {
            console.log(payload);
          })
        }
        resolve(result);
      })
      .catch(reject);
  });
}


export const StepServices = {
  CreateFaceId,
  CreateSignature,
  CreatePersonalData
}