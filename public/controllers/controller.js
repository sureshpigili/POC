var app = angular.module('routingDemoApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: 'This is the default Route'
            })
            .when('/computers', {
                template: 'This is the computers Route'
            })
            .when('/printers', {
                template: 'This is the printers Route'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);


function AppCtrl($scope, $http) {
    console.log("Hello world from controller");


    var refresh = function() {

        $http.get('/contactlist').success(function(response) {
            console.log("I got the data i requested");
            $scope.contactlist = response;
            $scope.contact = '';

        });

    };
    refresh();

    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response);
            refresh();


        });

    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response) {
            $scope.contact = response;
        });
    };



}
