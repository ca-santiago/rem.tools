const baseULR = `${process.env.REACT_APP_API_URL}/flujos`;
console.log(baseULR);
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
  console.log({ baseULR });
  return new Promise((resolve, reject) => {
    fetch(`${baseULR}`, {
      method: 'POST',
      mode: 'no-cors',
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

function GetFlujosPaginated(page = 0) {
  console.log({ paginated: baseULR });
  return new Promise((resolve, reject) => {
    fetch(`${baseULR}?page=${page}`, {
      mode: 'no-cors',
    })
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
