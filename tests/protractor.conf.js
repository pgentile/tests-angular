'use strict';

exports.config = {
  // chromeOnly: true,  // Tests seulement sur Google Chrome (pas de Selenium impliqué)
  specs: ['e2e/*.js'],
  baseUrl: 'http://localhost:3000', // URL du serveur
  multiCapabilities: [
    {
      browserName: 'chrome'
    },
    /*
    {
      browserName: 'firefox'
    }
    */
  ],
  maxSessions: 1
};
