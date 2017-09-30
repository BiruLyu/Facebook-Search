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
        $scope.pages = response.data.pages;
        $scope.events = response.data.events;
        $scope.places = response.data.places;
        $scope.groups = response.data.groups;
        $('#loadingmessage').hide();

        $scope.myTable = $scope.users; 
    }
    );
    };
    
    
//    $scope.tabs = [
//        {title: 'Users',url: 'page-Users.html'}, 
//        {title: 'Pages',url: 'page-Pages.html'}, 
//        {title: 'Events',url: 'page-Events.html'},
//        {title: 'Places',url: 'page-Places.html'}, 
//        {title: 'Groups',url: 'page-Groups.html'}, 
//        {title: 'Favorites',url: 'page-Favorites.html'}
//    ];
    
    $scope.tabs = [
        {title: 'Users', content: $scope.users }, 
        {title: 'Pages', content: $scope.pages }, 
        {title: 'Events', content: $scope.events },
        {title: 'Places', content: $scope.places }, 
        {title: 'Groups', content: $scope.groups }, 
        {title: 'Favorites', content: $scope.favorites }
    ];
    
    
    $scope.currentTab = 'one.tpl.html';
    
    $scope.myTable = $scope.users; 
    $scope.flag = 'Users';
    $scope.onClickTab = function (tab) {
       // $scope.currentTab = tab.url;
        if(tab.title === 'Users') {$scope.myTable = $scope.users; $scope.flag = 'Users';}
        else if(tab.title === 'Pages') {$scope.myTable = $scope.pages;$scope.flag = 'Pages';}
        else if(tab.title === 'Events') {$scope.myTable = $scope.events;$scope.flag = 'Events';}
        else if(tab.title === 'Places') {$scope.myTable = $scope.places;$scope.flag = 'Places';}
        else if(tab.title === 'Groups') {$scope.myTable = $scope.groups;$scope.flag = 'Groups';}
        else if(tab.title === 'Favorites') {$scope.myTable = $scope.favorites;$scope.flag = 'Favorites';}
        
        
        if($scope.myTable.paging.previous === undefined){
            //alert(1);
            $('#goNext').show();
            $('#goPrevious').hide();
        } else if ( $scope.myTable.paging.next === undefined) {
            //alert(2);
            $('#goNext').hide();
            $('#goPrevious').show();
        } else {
            //alert(3);
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
    
   
    
    $scope.PageChanging = function(Flag,Url){
        
//
//        $.getJSON(Url, function(response) {
//        
//        $scope.myTable = response;
//
//        if(Flag === 'Users') {$scope.users = $scope.myTable;}
//        else if(Flag === 'Pages') {$scope.pages = $scope.myTable;}
//        else if(Flag === 'Events') {$scope.events = $scope.myTable;}
//        else if(Flag === 'Places') {$scope.places = $scope.myTable;}
//        else if(Flag === 'Groups') {$scope.groups = $scope.myTable;}
//        else if(Flag === 'Favorites') {$scope.favorites = $scope.myTable;}
//
//        if($scope.myTable.paging.previous === undefined){
//            //alert(1);
//            $('#goNext').show();
//            $('#goPrevious').hide();
//        } else if ( $scope.myTable.paging.next === undefined || $scope.myTable.data.length < 25) {
//            //alert(2);
//            $('#goNext').hide();
//            $('#goPrevious').show();
//        } else {
//            //alert(3);
//            $('#goNext').show();
//            $('#goPrevious').show();
//        }           
//});
        var config= {params: {url: Url}};  
            
        
        
        $http.get(Url).then(function(response){

                $scope.myTable = response.data;
            
                if(Flag === 'Users') {$scope.users = $scope.myTable;}
                else if(Flag === 'Pages') {$scope.pages = $scope.myTable;}
                else if(Flag === 'Events') {$scope.events = $scope.myTable;}
                else if(Flag === 'Places') {$scope.places = $scope.myTable;}
                else if(Flag === 'Groups') {$scope.groups = $scope.myTable;}
                else if(Flag === 'Favorites') {$scope.favorites = $scope.myTable;}
            
                if($scope.myTable.paging.previous === undefined){
                    //alert(1);
                    $('#goNext').show();
                    $('#goPrevious').hide();
                } else if ( $scope.myTable.paging.next === undefined || $scope.myTable.data.length < 25) {
                    //alert(2);
                    $('#goNext').hide();
                    $('#goPrevious').show();
                } else {
                    //alert(3);
                    $('#goNext').show();
                    $('#goPrevious').show();
                }
                
            }
        );
        
        

         
    };
});



//myApp.factory('myService', function() {});