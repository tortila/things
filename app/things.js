angular.module('things', ['ngRoute', 'ngResource'])

    .factory('ThingsFactory', ['$http', function ($http) {
        return $http.get('content.json')
    }])

    .config(function($routeProvider) {
      $routeProvider
          .when('/', {
            controller:'ThingsListController',
            templateUrl:'list.html'
          })
          .when('/detail/:thingId', {
            controller:'DetailThingController',
            templateUrl:'detail.html'
          })
          .otherwise({
            redirectTo:'/'
          });
    })

    .controller('ThingsListController', ['$http', '$scope',
        function($http, $scope) {
            $http.get('content.json').success(function(data) {
                $scope.thingsList = data;
            });
        }
    ])

    .controller('DetailThingController', ['$scope', '$routeParams',
        function($scope, $routeParams) {
            $scope.thingId = $routeParams.thingId;
        }
    ]);
