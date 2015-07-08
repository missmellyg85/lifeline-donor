'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myAppControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {templateUrl: 'partials/supporter/supporter-index.html', controller: 'Supporter'});
  
  $routeProvider.when('/lifeline-services-icons', {templateUrl: 'partials/lifeline/lifelinfe-services-icons.html', controller: 'Lifeline'});

  $routeProvider.when('/supporter-index', {templateUrl: 'partials/supporter/supporter-index.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-get-involved', {templateUrl: 'partials/supporter/supporter-get-involved.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-team', {templateUrl: 'partials/supporter/supporter-team.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-services/', {templateUrl: 'partials/supporter/supporter-services.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-services/:service', {templateUrl: 'partials/supporter/supporter-services.html', controller: 'Supporter'});
  
  $routeProvider.when('/supporter-about', {templateUrl: 'partials/supporter/supporter-about.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-donate', {templateUrl: 'partials/supporter/supporter-donate.html', controller: 'Supporter'});
  $routeProvider.when('/taxCredits', {templateUrl: 'partials/supporter/taxCredits.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-contact', {templateUrl: 'partials/supporter/supporter-contact.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-stories', {templateUrl: 'partials/supporter/supporter-stories.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-videos', {templateUrl: 'partials/supporter/supporter-videos.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-volunteer', {templateUrl: 'partials/supporter/supporter-volunteer.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-events', {templateUrl: 'partials/supporter/supporter-events.html', controller: 'Supporter'});
  $routeProvider.when('/employment', {templateUrl: 'partials/supporter/employment.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-new-projects', {templateUrl: 'partials/supporter/supporter-new-projects.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-learn-more', {templateUrl: 'partials/supporter/supporter-learn-more.html', controller: 'Supporter'});
  $routeProvider.when('/supporter-get-involved', {templateUrl: 'partials/supporter/supporter-get-involved.html', controller: 'Supporter'});
  
  $routeProvider.otherwise({redirectTo: '/index'});
}])
.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = "";
    });
}]);
