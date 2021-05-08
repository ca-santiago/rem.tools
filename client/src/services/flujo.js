const baseULR = `${process.env.REACT_APP_API_URL}/flujos`;
console.log(baseULR);
function verifyFlujoToken(token) {
  return new Promise((resolve, reject) => {
    fetch(`${baseULR}/`, {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
      .then(result => {
        console.log('Status: ', result.status);
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.status === 200) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(err => {
        reject();
      });
  })
}

function getFlujoById(id) {
  return new Promise((resolve, reject) => {
    fetch(`${baseULR}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log('Status: ', result.status);
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.status === 200) {
          resolve(result);
        } else {
          reject();
        }
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}


function createNewFlujo(types) {
  console.log({ baseULR });
  return new Promise((resolve, reject) => {
    fetch(`${baseULR}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        types,
      })
    })
      .then(result => {
        console.log('Status: ', result.status);
        if (result.status === 400) {
          return result.json().then(badRequest => {
            console.log(badRequest)
            reject(badRequest);
          })
        }
        if (result.status === 201) {
          resolve(result);
        } else {
          reject();
        }
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
}

function GetFlujosPaginated(page = 0) {
  console.log({ paginated: baseULR });
  return new Promise((resolve, reject) => {
    fetch(`${baseULR}`)
      .then(data => {
        if (data.status === 200) {
          resolve(data.json());
        } else {
          reject();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}


export const FlujoServices = {
  getFlujoById,
  verifyFlujoToken,
  createNewFlujo,
  GetFlujosPaginated,
}
