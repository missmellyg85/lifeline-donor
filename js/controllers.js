'use strict';

/* Controllers */

var myAppControllers = angular.module('myAppControllers', []);

myAppControllers.controller('Lifeline', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
        $scope.info = {
            name: 'Lifeline Pregnancy Help Clinic',
            street: '1515 N. New Street',
            citystate: 'Kirksville, MO',
            zip: '63501',
            phone: '660-665-5688',
            fax: '660-665-9497',
            email: 'LifelinePRC@sbcglobal.net',
            supporterUrl: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YU4ZL2SKUKCDU',
            hours: 'M-W 9:00am - 5:00pm, Th 10:00am-6:00pm'
            };
    }]);

myAppControllers.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location',
    function($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.current = $location.path();
    }]);

myAppControllers.controller('Supporter', ['$scope', '$routeParams', '$location', '$http',
  function($scope, $routeParams, $location, $http) {
    $scope.navigation = "partials/supporter/supporter-nav2.html";

    $scope.volunteerFormInfo = {
        volunteer: {
            showVolunteerOptions: 'true',
            blurb: 'To have a volunteer application sent to you, please fill out the form below:',
            options: [
                {name: 'Peer Counselor'}, 
                {name: 'DadLINE Mentor'}, 
                {name: 'Special Projects Only'}
            ],
            volunteerType: 'volunteer'
        },
        board: {
            blurb: 'Lifeline is governed by a volunteer Board of Directors.  To learn more about Lifeline’s Board of Directors or to inquire about Board membership, please fill out the form below to be contacted:',
            volunteerType: 'board'
        }
    };

    $scope.volunteer = {};
    $scope.submitVolunteerForm = function(type) {
        $scope.submitted = true;
        if ($scope.volunteerForm.$valid) {
            $scope.volunteer['type'] = type;
            $http({
                url: "process.php?type=volunteer",
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: 'formData=' + angular.toJson($scope.volunteer),
                    accept: 'application/json'
                })
                .success(function(data) {
                    if (data.errors) {
                        $scope.errors = [];
                        for(var error in data.errors) {
                            $scope.errors[error] = true;
                        }
                    } else if(data.error) {
                        $scope.error = data.error;
                    } else {
                        // if successful, bind success message to message and set form to pristine
                        $scope.message = data.message;
                        $scope.volunteerForm.$setPristine();
                        $scope.submitted = false;
                        $scope.volunteer = {};
                    }
                })
                .error(function(data) {

                });
        };
    };

    $scope.allowDisplay = false;
    $scope.assignDisplayAllowance = function() {
        $scope.allowDisplay = true;
    };

    var servicePrefix = "partials/lifeline/services/";
        $scope.service = (($routeParams.service != null)?servicePrefix+$routeParams.service:null);

    $scope.serviceIconClick = function(service) {
        if (!$scope.allowDisplay) {
            var newPath = '/supporter-services/'+service;
            $location.path(newPath);
        }
        $scope.service = servicePrefix+service;
    };

    $scope.reg = {};
    $scope.reg.type="individual";
    $scope.initiateTeammates = function() {
        $scope.reg.teammate = [{}, {}, {}];
    }
    $scope.clearTeammates = function() {
        if($scope.reg.teammate){
            delete $scope.reg.teammate;
        }
    }
    $scope.submitRegForm = function() {
        $scope.submitted = true;
        if($scope.regForm.$valid) {
            $http({
                url: "process.php?type=reg",
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: 'formData=' + angular.toJson($scope.reg),
                    accept: 'application/json'
                })
                .success(function(data) {
                    if(data.errors){
                        console.log('success but with errors');
                        $scope.errors = [];
                        for(var error in data.erorrs) {
                            $scope.errors[error] = true;
                        }
                    } else if(data.error) {
                        console.log('success but with an error');
                        $scope.error = data.error;
                    } else {
                        console.log('success');
                        //if successful all the way, bind success message to message and set
                        //for to pristine
                        $scope.showReg = false;
                        $scope.message = data.message;
                        $scope.regForm.$setPristine();
                        $scope.submitted = false;
                        $scope.reg = {};
                    }
                })
                .error(function(data) {
                    $scope.message = "There was an error processing the request.";
                });
        };
    };
  }]);
