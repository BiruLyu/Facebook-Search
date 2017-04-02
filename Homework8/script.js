// Declare the main module

/*jslint white:true */
/*global angular */
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap'
]);

// Initialize the main module
myApp.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {

    'use strict';

    /**
     * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
     * @param  {String} path The root-relative url for the new route
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



myApp.controller('namesCtrl', function($scope, $window, $http, $log) {
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
    
    $scope.tabs = [
        {title: 'Users',url: 'page-Users.html'}, 
        {title: 'Pages',url: 'page-Pages.html'}, 
        {title: 'Events',url: 'page-Events.html'},
        {title: 'Places',url: 'page-Places.html'}, 
        {title: 'Groups',url: 'page-Groups.html'}, 
        {title: 'Favorites',url: 'page-Favorites.html'}
    ];
    
    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl === $scope.currentTab;
    };
    $scope.Back = function(){
         $window.history.back();
    };
    $scope.Details = function(itemId) {
        
        var config = {
            params: {
                id: itemId
            }
        };
        $http.get("index2.php",config).then(function(response){
                $scope.detail = response.data;
            }
        );
        
       $scope.currentTab = 'page-Detail.html';
    
        //$rootScope.$emit("CallParentMethod", {path:'/page4',pageAnimationClass:'slideLeft'});
    
    };
    
    
    $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
    
      $scope.groups = [
    {
      "Name" : "Alfreds Futterkiste",
      "Country" : "Germany",
      "open" : true
    },
    {
      "Name" : "Berglunds snabbköp",
      "Country" : "Sweden",
      "open": false
    },
    {
      "Name" : "Centro comercial Moctezuma",
      "Country" : "Mexico",
      "open" : false
    },
    {
      "Name" : "Ernst Handel",
      "Country" : "Austria",
      "open" : false
    }
  ];
    
});