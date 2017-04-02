/*jslint white:true */
/*global angular */
/*global $, jQuery, alert*/
var myApp = angular.module('myApp', []);

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
        $scope.currentTab = 'page-Detail.html';
       
    
        //$rootScope.$emit("CallParentMethod", {path:'/page4',pageAnimationClass:'slideLeft'});
    
    };
});


myApp.directive('dExpandCollapse', function() {
    "use strict";
  return {
          restrict: 'EA',
          link: function(scope, element, attrs){
            
            $(element).click( function() {
                //var show = "false";
                $(element).find(".answer").slideToggle('200',function() {            
                    // You may toggle + - icon     
                    $(element).find("span").toggleClass('faqPlus faqMinus');
                });
                if($("div.answer:visible").length>1) {
                // You may toggle + - icon
                //$(this).parent().find("span.faqMinus").removeClass('faqMinus').addClass('faqPlus');
                    $(this).siblings().find(".answer").slideUp('slow');
                }
            });

          }
        };



});
//myApp.factory('myService', function() {});