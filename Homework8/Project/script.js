/*jslint white:true */
/*global angular */
/*global $, jQuery, alert*/
var app = angular.module('myApp', ['ngAnimate']);
app.controller('animationsCtrl', function ($scope, $http, $log) {
    "use strict";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            //alert($scope.latitude);
            //alert($scope.longitude);
        });
    }
    $scope.ngSwitchItems = ['item1', 'item2', 'item3'];
    $scope.tabs = [
        {
            title: 'Users'
            , content: $scope.users
        }
        , {
            title: 'Pages'
            , content: $scope.pages
        }
        , {
            title: 'Events'
            , content: $scope.events
        }
        , {
            title: 'Places'
            , content: $scope.places
        }
        , {
            title: 'Groups'
            , content: $scope.groups
        }
        , {
            title: 'Favorites'
            , content: $scope.favorites
        }
    ];
    $scope.currentTab = 'one.tpl.html';
    $scope.myTable = $scope.users;
    $scope.flag = 'Users';
    $scope.onClickTab = function (tab) {
        // $scope.currentTab = tab.url;
        if (tab.title === 'Users') {
            $scope.myTable = $scope.users;
            $scope.flag = 'Users';
        }
        else if (tab.title === 'Pages') {
            $scope.myTable = $scope.pages;
            $scope.flag = 'Pages';
        }
        else if (tab.title === 'Events') {
            $scope.myTable = $scope.events;
            $scope.flag = 'Events';
        }
        else if (tab.title === 'Places') {
            $scope.myTable = $scope.places;
            $scope.flag = 'Places';
        }
        else if (tab.title === 'Groups') {
            $scope.myTable = $scope.groups;
            $scope.flag = 'Groups';
        }
        else if (tab.title === 'Favorites') {
            $scope.myTable = $scope.favorites;
            $scope.flag = 'Favorites';
        }
        if ($scope.myTable.paging.previous === undefined) {
            //alert(1);
            $('#goNext').show();
            $('#goPrevious').hide();
        }
        else if ($scope.myTable.paging.next === undefined) {
            //alert(2);
            $('#goNext').hide();
            $('#goPrevious').show();
        }
        else {
            //alert(3);
            $('#goNext').show();
            $('#goPrevious').show();
        }
    };
    
    
    ///////////////////Search////////////////////////
    $scope.Search = function () {
        $('#initialPage').show();
        $('#loadingmessage').show();
        var data = {
            params: {
                keyword: $scope.keyword
                , latitude: $scope.latitude
                , longitude: $scope.longitude
            }
        };
        $http.get("index2.php", data).then(function (response) {
            //alert(response.data);
            $scope.users = response.data.users;
            $scope.pages = response.data.pages;
            $scope.events = response.data.events;
            $scope.places = response.data.places;
            $scope.groups = response.data.groups;
            $('#loadingmessage').hide();
            $scope.myTable = $scope.users;
        }, function errorCallback(response) {
            alert(response.data);
        });
    };
    ///////////////////Details////////////////////////
    $scope.Details = function (itemId, portrait) {
        //$scope.currentTab = 'page-Detail.html';
        $scope.ngSwitchSelected = 'item2';
        $('#loadingAlbum').show();
        $('#loadingPosts').show();
        $scope.portrait = portrait;
        var config = {
            params: {
                id: itemId
            }
        };
        $http.get("index2.php", config).then(function (response) {
            $scope.detail = response.data;
        });
        $('#loadingAlbum').hide();
        $('#loadingPosts').hide();
        //$rootScope.$emit("CallParentMethod", {path:'/page4',pageAnimationClass:'slideLeft'});
    };
    ///////////////////Back/////////////////////
    $scope.Back = function () {
        $scope.ngSwitchSelected = 'item1';
    };
    ///////////////////PageChanging/////////////////////
    $scope.PageChanging = function (Flag, Url) {
        var config = {
            params: {
                url: Url
            }
        };
        $http.get(Url).then(function (response) {
            $scope.myTable = response.data;
            if (Flag === 'Users') {
                $scope.users = $scope.myTable;
            }
            else if (Flag === 'Pages') {
                $scope.pages = $scope.myTable;
            }
            else if (Flag === 'Events') {
                $scope.events = $scope.myTable;
            }
            else if (Flag === 'Places') {
                $scope.places = $scope.myTable;
            }
            else if (Flag === 'Groups') {
                $scope.groups = $scope.myTable;
            }
            else if (Flag === 'Favorites') {
                $scope.favorites = $scope.myTable;
            }
            if ($scope.myTable.paging.previous === undefined) {
                //alert(1);
                $('#goNext').show();
                $('#goPrevious').hide();
            }
            else if ($scope.myTable.paging.next === undefined || $scope.myTable.data.length < 25) {
                //alert(2);
                $('#goNext').hide();
                $('#goPrevious').show();
            }
            else {
                //alert(3);
                $('#goNext').show();
                $('#goPrevious').show();
            }
        });
    };
});