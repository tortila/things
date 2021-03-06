angular.module('things', ['ngRoute', 'ngResource'])

    .factory('ThingsFactory', ['$http', function ($http) {
        return $http.get('data/content.json');
    }])

    .config(function($routeProvider) {
      $routeProvider
          .when('/', {
            controller:'ThingsListController',
            templateUrl:'views/list.html'
          })
          .when('/detail/:thingId', {
            controller:'DetailThingController',
            templateUrl:'views/detail.html'
          })
          .otherwise({
            redirectTo:'/'
          });
    })

    .controller('ThingsListController', ['$scope', 'ThingsFactory',
        function($scope, ThingsFactory) {
            ThingsFactory.success(function(data) {
                $scope.thingsList = data;
            });
            $scope.sortType = 'name';
            $scope.sortReverse  = false;
        }
    ])

    .controller('DetailThingController', ['$scope', '$routeParams', '$filter', 'ThingsFactory',
        function($scope, $routeParams, $filter, ThingsFactory) {

            $scope.thingId = $routeParams.thingId;

            ThingsFactory.success(function(data) {
                $scope.thing = $filter('filter')(data, {id: $scope.thingId})[0];
                $scope.galleryLink = $scope.thing.links[0];
            });

            $scope.setGalleryImg = function(link) {
                $scope.galleryLink = link;
            }
        }
    ]);
