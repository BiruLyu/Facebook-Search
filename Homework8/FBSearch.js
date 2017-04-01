/*jslint white:true */
/*global angular */
var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $http, $log) {
     "use strict";
    
    $scope.Search = function() {
        var config = {
            params: {
                keyword: $scope.keyword
            }
        };
        $http.get("index2.php",config).then(function(response){
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
    };
});