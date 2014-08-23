tests-angular
=============

Tests sur AngularJS


Installation
------------

Les tests sur AngularJS ont besoin des programmes suivants :

* [node.js](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)

L'environnement de développement s'initialise grâce au script `./build.sh`.


Travailler sur l'application
----------------------------

Pour développer, utiliser `grunt dev`.
Cette commande initialise un serveur HTTP accessible sur http://localhost:3000, exécute automatiquement les tâches Grunt lors de la modification des sources et exécute en continue les tests unitaires avec [Karma](karma-runner.github.io).

La commande `grunt protractor` lance les tests _end-to-end_.
