'use strict';

exports.config = {
  // chromeOnly: true,  // Tests seulement sur Google Chrome (pas de Selenium impliqué)
  specs: ['*.spec.js'],
  baseUrl: 'http://localhost:3000', // URL du serveur
  multiCapabilities: [
    {
      browserName: 'chrome'
    },
    // {
    //   browserName: 'firefox'
    // },
    // {
    //   browserName: 'safari'
    // }
  ],
  maxSessions: 1
};
