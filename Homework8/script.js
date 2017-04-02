// Declare the main module

/*jslint white:true */
/*global angular */
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate'
]);

// Initialize the main module
myApp.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {

    'use strict';

    /**
     * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
     * @param  {String} path               The root-relative url for the new route
     * @param  {String} pageAnimationClass A classname defining the desired page transition
     */

    
    $rootScope.go = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') { // Use a default, your choice
            $rootScope.pageAnimationClass = 'undefined';
        }
        
        else { // Use the specified animation
            $rootScope.pageAnimationClass = pageAnimationClass;
        }

        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        }
        
        else { // Go to the specified path
            $location.path(path);
        }
    };
}]);

// Configure the main module
myApp.config(['$routeProvider', function ($routeProvider) {

    'use strict';

    $routeProvider
        .when('/page-Users', {
            templateUrl: 'page-Users.html'
        })
        .when('/page-Pages', {
            templateUrl: 'page-Pages.html'
        })
        .when('/page-Events', {
            templateUrl: 'page-Events.html'
        })
        .when('/page-Places', {
            templateUrl: 'page-Places.html'
        })
        .when('/page-Groups', {
            templateUrl: 'page-Groups.html'
        })
        .when('/page-Favorites', {
            templateUrl: 'page-Favorites.html'
        })
        .when('/page-Detail', {
            templateUrl: 'page-Detail.html'
        })
        .when('/page1', {
            templateUrl: 'page1.html'
        })
        .when('/page2', {
            templateUrl: 'page2.html'
        })
        .when('/page3', {
            templateUrl: 'page3.html'
        })
        .when('/page4', {
            templateUrl: 'page4.html'
        })
        .otherwise({
            redirectTo: 'page-Detail.html/'
        });
}]);

myApp.controller('namesCtrl', function($scope, $rootScope, $http, $log) {
     "use strict";
    
    $scope.Search = function() {
        var data = {
            params: {
                keyword: $scope.keyword
            }
        };
        $http.get("index2.php",data).then(function(response){
        $scope.users = response.data.users.data;
        $scope.pages = response.data.pages.data;
        $scope.events = response.data.events.data;
        $scope.places = response.data.places.data;
        $scope.groups = response.data.groups.data;
        
    }
    );
    };
    
    
    $scope.Details = function(itemId) {
        $scope.detail = itemId;
        var config = {
            params: {
                id: itemId
            }
        };
        $http.get("index2.php",config).then(function(response){
                $scope.detail = response.data;
            }
        );
        
       $rootScope.go('/page-Detail', 'slideRight');
    
        //$rootScope.$emit("CallParentMethod", {path:'/page4',pageAnimationClass:'slideLeft'});
    
    };
});