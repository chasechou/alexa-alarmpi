'use strict';

const FauxMo = require('fauxmojs');
const request = require('request-promise');
const server = 'http://192.168.1.65:8000';

let fauxMo = new FauxMo(
  {
    devices: [
      {
        name: 'home',
        port: 11000,
        handler: (action) => {
          console.log('home action:', action);
          alarmpi('click_home');
        }
      },
      {
        name: 'away',
        port: 11001,
        handler: (action) => {
          console.log('away action:', action);
          alarmpi('click_away');
        }
      },
      {
        name: 'sleep',
        port: 11002,
        handler: (action) => {
          console.log('sleep action:', action);
          alarmpi('click_off');
        }
      }
    ]
  });

function alarmpi(endpoint) {
  const options = {
    method: 'GET',
    uri: server + '/api/' + endpoint,
  };
  request(options)
    .then(function (response) {
      console.log('done: ' + response);
    })
    .catch(function (err) {
      console.log('error: ' + err);
    });
}

console.log('started..');
