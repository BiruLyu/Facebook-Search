/*jslint white:true */
/*global angular */
/*global $, jQuery, alert*/
var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function($scope, $rootScope, $http, $log) {
     "use strict";
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            //alert($scope.latitude);
            //alert($scope.longitude);
                  
        });
    }
    

    
    
    
    $scope.Search = function() {
        $('#loadingmessage').show();
        var data = {
            params: {
                keyword : $scope.keyword,
                latitude : $scope.latitude,
                longitude : $scope.longitude
            }
        };
        $http.get("index2.php",data).then(function(response){
        //alert(response.data);
        
        $scope.users = response.data.users;
        $scope.pages = response.data.pages.data;
        $scope.events = response.data.events.data;
        $scope.places = response.data.places.data;
        $scope.groups = response.data.groups.data;
        $('#loadingmessage').hide();
        
        if($scope.users.paging.previous === undefined){
            alert(1);
            $('#goNext').show();
            $('#goPrevious').hide();
        } else if ( $scope.users.paging.next === undefined) {
            alert(2);
            $('#goNext').hide();
            $('#goPrevious').show();
        } else {
            alert(3);
            $('#goNext').show();
            $('#goPrevious').show();
        }
        
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
 
        
        if($scope.users.paging.previous === undefined){
            alert(1);
            $('#goNext').show();
            $('#goPrevious').hide();
        } else if ( $scope.users.paging.next === undefined) {
            alert(2);
            $('#goNext').hide();
            $('#goPrevious').show();
        } else {
            alert(3);
            $('#goNext').show();
            $('#goPrevious').show();
        }
        
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl === $scope.currentTab;
    };
    
    $scope.Details = function(itemId, portrait) {
        $scope.portrait = portrait;
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
    
   
    
    $scope.PageChanging = function(tab,previousUrl, nextUrl){
        

        
        var config;
        if(tab === 'Previous'){
            config = {params: {url: previousUrl}};           
            
        } else {
            config = {params: {url: nextUrl}};
              
        }
        
        $http.get("index2.php",config).then(function(response){

                $scope.users = response.data;
                if($scope.users.paging.previous === undefined){
                    alert(1);
                    $('#goNext').show();
                    $('#goPrevious').hide();
                } else if ( $scope.users.paging.next === undefined || $scope.users.data.length < 25) {
                    alert(2);
                    $('#goNext').hide();
                    $('#goPrevious').show();
                } else {
                    alert(3);
                    $('#goNext').show();
                    $('#goPrevious').show();
                }
                
            
            }
        );
         
    };
});



//myApp.factory('myService', function() {});