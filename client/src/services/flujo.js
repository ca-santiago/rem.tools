const baseULR = 'http://localhost:3300/flujos';

function verifyFlujoToken(token) {
  return new Promise((res, rej) => {
    fetch(`${baseULR}/`, {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
      .then(data => {
        if (data.status === 200) {
          res();
        } else {
          rej();
        }
      })
      .catch(err => {
        rej();
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
      .then(data => {
        if (data.status === 200) {
          resolve(data);
        } else {
          reject();
        }
      })
      .catch(err => {
        // console.log(err);
        reject();
      });
  });
}


function createNewFlujo(types) {
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
      .then(data => {
        if (data.status === 201) {
          resolve(data);
        } else {
          reject();
        }
      })
      .catch(err => {
        // console.log(err);
        reject();
      });
  });
}


export const FlujoServices = {
  getFlujoById,
  verifyFlujoToken,
  createNewFlujo,
}
