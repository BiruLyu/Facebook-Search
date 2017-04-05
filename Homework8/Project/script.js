/*jslint white:true */
/*global angular */
/*global $, jQuery, alert, FB*/



var app = angular.module('myApp', ['ngAnimate']);
app.controller('animationsCtrl', function ($scope, $http, $log) {
    "use strict";
    //localStorage.clear();
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
    $scope.flag = 'users';
    //////////////////////Click Tab ////////////////////////////
    $scope.onClickTab = function (tab) {
        // $scope.currentTab = tab.url;
        
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
        if ($scope.isDetail) {
            $scope.ngSwitchSelected = 'item1';
            $scope.isDetail = false;
        }
        
        
        
        if (tab.title === 'Users') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.users;
            $scope.flag = 'users';
        }
        else if (tab.title === 'Pages') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.pages;
            $scope.flag = 'pages';
        }
        else if (tab.title === 'Events') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.events;
            $scope.flag = 'events';
        }
        else if (tab.title === 'Places') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.places;
            $scope.flag = 'places';
        }
        else if (tab.title === 'Groups') {
            //$('.type').hide();
            $scope.activeFavorite = false;
            $scope.myTable = $scope.groups;
            $scope.flag = 'groups';
        }
        else if (tab.title === 'Favorites') {
            //$('.type').show();
            $scope.activeFavorite = true;
            var favorList = []
                , temp = []
                , tempPair = {};
            $scope.favorites = [];
            $.each(localStorage, function (key, value) {
                temp = JSON.parse(value);
                //alert(temp[0]);
                $scope.favorites.push(temp);
                //tempPair = { picture : temp[0],name:temp[1],type:temp[2]};
                //favorList.push(tempPair);
                //var temp2 = JSON.parse(localStorage.getItem(id));
                //alert(temp[0]);
                //alert(tempPair.picture);
                // key magic
                // value magic
            });
            //$scope.myTable = $scope.favorites;
            $scope.flag = 'favorites';
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
            
            if ($scope.flag === 'users') {
                $scope.myTable = $scope.users;
            }
            else if ($scope.flag === 'pages') {
                $scope.myTable = $scope.pages;
            }
            else if ($scope.flag === 'events') {
                $scope.myTable = $scope.events;
            }
            else if ($scope.flag === 'places') {
                $scope.myTable = $scope.places;
            }
            else if ($scope.flag === 'groups') {
                $scope.myTable = $scope.groups;
            }
            
        }, function errorCallback(response) {
            
            alert(response.data);
        });
    };
    ///////////////////Details////////////////////////
    $scope.Details = function (itemId, portrait) {
        //$scope.currentTab = 'page-Detail.html';
        $scope.isDetail = true;
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
            $scope.test = $scope.detail;
            //alert($scope.detail.albums.data.length);
            if($scope.detail.albums !== undefined && $scope.detail.albums.data !== undefined && $scope.detail.albums.data.length > 0){
                $scope.albumNums = true;
            } else {
                $scope.albumNums = false;
            }
            
            if($scope.detail.posts !==undefined && $scope.detail.posts.data !== undefined && $scope.detail.posts.data.length > 0){
                $scope.postsNums = true;
            } else {
                $scope.postsNums = false;
            }
            
            $('#loadingAlbum').hide();
            $('#loadingPosts').hide();
            
        }, function errorCallback(response) {
            $scope.albumNums = false;
            $scope.postsNums = false;
            $('#loadingAlbum').hide();
            $('#loadingPosts').hide();
        });
        //$rootScope.$emit("CallParentMethod", {path:'/page4',pageAnimationClass:'slideLeft'});
    };
    
    $scope.timeFormat = function(created_time){
        return Date.parse(created_time);
    };
    
    
    $scope.postFB = function(portrait, name){
        FB.ui({
                  method: 'feed',
                  picture: portrait,
                  name: name,
                  display: 'popup',
                  caption: 'FB SEARCH FROM USC CSCI571'
                }, function(response){}); 
    };
    ///////////////////Back/////////////////////
    $scope.Back = function () {
        $scope.ngSwitchSelected = 'item1';
    };
    ///////////////////FavoriteStyle/////////////////
    $scope.activeStarStyle = function (id) {
        var temp = {};
        if (localStorage.getItem(id) === null) {
            temp = {
                "color": 'black'
            };
        }
        else {
            temp = {
                'color': '#FED800'
            };
        }
        return temp;
    };
    $scope.activeStarClass = function (id) {
        var temp = [];
        if (localStorage.getItem(id) === null) {
            temp.push('glyphicon');
            temp.push('glyphicon-star-empty');
        }
        else {
            temp.push('glyphicon');
            temp.push('glyphicon-star');
        }
        return temp;
    };
    ///////////////////Delete Favorite/////////////////
    $scope.DelFavorite = function (id) {
        localStorage.removeItem(id);
        $scope.onClickTab({
            title: 'Favorites'
        });
    };
    ///////////////////Favorite/////////////////
    $scope.Favorite = function (id, url, name, flag) {
        if (localStorage.getItem(id) === null) {
            var a, temp = [];
            //a = '#'+id;
            //$(a).removeClass( "glyphicon-star-empty" ).addClass( "glyphicon-star" ).css('color', '#FED800');
            temp.push(url, name, flag, id);
            localStorage.setItem(id, JSON.stringify(temp));
        }
        else {
            localStorage.removeItem(id);
        }
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
            if (Flag === 'users') {
                $scope.users = $scope.myTable;
            }
            else if (Flag === 'pages') {
                $scope.pages = $scope.myTable;
            }
            else if (Flag === 'events') {
                $scope.events = $scope.myTable;
            }
            else if (Flag === 'places') {
                $scope.places = $scope.myTable;
            }
            else if (Flag === 'groups') {
                $scope.groups = $scope.myTable;
            }
//            else if (Flag === 'favorites') {
//                $scope.favorites = $scope.favorites;
//            }
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