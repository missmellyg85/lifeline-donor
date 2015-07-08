'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .value('slides', [
        'logo.jpg',
        'image1.jpg',
        'image6.jpg',
        'image3.jpg',
        'image2.jpg'
    ]);
  
