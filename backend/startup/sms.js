const axios = require("axios");

const senderSmS = (to) => {
  let data = JSON.stringify({ to });

let config = {
  method: 'post',
  url: 'https://console.melipayamak.com/api/send/otp/fc1c250027aa42f587ebc40b3bbf5454',
  headers: { 
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUzYzZmZTQ2ZWNjODNkOWEyZTI0MTMiLCJpYXQiOjE2ODMyMTIwMzB9.iNWJJI0yNmoL3SkoTKpiFNQrf7Uviy1SWe6oOVK2Ymw', 
    'Content-Type': 'application/json'
  },
  data : data
};

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

module.exports = senderSmS;
