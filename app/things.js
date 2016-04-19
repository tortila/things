angular.module('things', ['ngRoute', 'ngResource'])

    .factory('ThingsFactory', ['$http', function ($http) {
        return $http.get('content.json')
    }])

    .config(function($routeProvider) {
      var resolveThings = {
          things: function (ThingsFactory) {
              return ThingsFactory;
          }
      };

      $routeProvider
          .when('/', {
            controller:'ThingsListController as thingsList',
            templateUrl:'list.html',
            resolve: resolveThings
          })
          .when('/detail/:thingId', {
            controller:'DetailThingController as detailThing',
            templateUrl:'detail.html',
            resolve: resolveThings
          })
          .otherwise({
            redirectTo:'/'
          });
    })

    .controller('ThingsListController', function(ThingsFactory) {
        var thingsList = this;
        ThingsFactory.success(function(data) {
            thingsList.things = data;
        })
    })

    .controller('DetailThingController',
    function($location, $routeParams, things) {
      var detailThing = this;
      var thingId = $routeParams.thingId,
          thingIndex;

      detailThing.things = things;
      thingIndex = detailThing.things.$indexFor(thingId);
      detailThing.thing = detailThing.things[thingIndex];

    });
