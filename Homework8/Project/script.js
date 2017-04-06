/*jslint white:true */
/*global angular */
/*global console,$, jQuery, alert, FB*/


angular.element(document).ready(function () {
    "use strict";
    $('#firstPage').hide();

});
var app = angular.module('myApp', ['ngAnimate']);
app.controller('animationsCtrl', function ($scope, $http, $log) {
    "use strict";
    //localStorage.clear();
    
    
    var init = function () {
    // do something
        $('#firstPage').hide();
    };

    init();
    
    if(localStorage.getItem('favoriteIndex') === null){
        localStorage.setItem('favoriteIndex',JSON.stringify([]));
    }
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

    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////Search////////////////////////
    $scope.Search = function () {
        $('#firstPage').hide();
        //$('#initialPage').show();
        $('#firstProgress').show();
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
            $('#firstProgress').hide();
            $('#firstPage').show();
            console.log($('#firstPage'));
            
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
        ////////////////////////////////////////////////////////////////////////////////////////////////Click Tab ////////////////////////////
    $scope.isActiveTab = function(tab){
       // alert(tab.title);
        //console.log($scope.flag);
        //console.log(tab.title.toLowerCase() === $scope.flag);
        return tab.title.toLowerCase() === $scope.flag;
    };
    $scope.onClickTab = function (tab) {
        // $scope.currentTab = tab.url;
        //var temp2222 = 'true';
        //console.log(tab.title === $scope.flag.toLowerCase());
        
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
        ////////////////////////////////////////////////////////////////////////////////////////////////Favorite Page ////////////////////////////
        else if (tab.title === 'Favorites') {
            //$('.type').show();
            $scope.activeFavorite = true;
            var favorList = []
                , temp = []
                , tempPair = {}
                ,favoriteIndex =[];
            
            $scope.favorites = [];

            //$.each(localStorage, function (key, value) {
                //temp = JSON.parse(value);
                //alert(key);
                //alert(value);
                //$scope.favorites.push(temp);
                //tempPair = { picture : temp[0],name:temp[1],type:temp[2]};
                //favorList.push(tempPair);
                //var temp2 = JSON.parse(localStorage.getItem(id));
                //alert(temp[0]);
                //alert(tempPair.picture);
                // key magic
                // value magic
            //});
                //console.log(localStorage);
                favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
                //console.log(favoriteIndex);
                $.each(favoriteIndex, function (key,value) {
                    //console.log(key,value);
                    temp = JSON.parse(localStorage.getItem(value));
                    $scope.favorites.push(temp);
                });
//                favoriteIndex.forEach(function(key) {
//                console.log(key);
//                temp = JSON.parse(localStorage.getItem(key));
//                $scope.favorites.push(temp);
//                //console.log(element);
//                
//            });
            //$scope.myTable = $scope.favorites;
            $scope.flag = 'favorites';
            $('#firstPage').show();
        }
        $('#firstPage').show();
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

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Details////////////////////////
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
                }, function(response){ 
            if(response && (!response.error_message)){
                alert("Posted Successfully");
            } else {
                alert("Not Posted");
              }
        });
           
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Back/////////////////////
    $scope.Back = function () {
        
        
        $scope.ngSwitchSelected = 'item1';
        $('#firstPage').show();
        console.log($('#firstPage'));
        
        $scope.onClickTab({
            title: 'Users'
        });
        
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////FavoriteStyle/////////////////
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Delete Favorite/////////////////
    $scope.DelFavorite = function (id) {
        var favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
        favoriteIndex.splice(favoriteIndex.indexOf(id),1);
        localStorage.setItem('favoriteIndex',JSON.stringify(favoriteIndex));
        localStorage.removeItem(id);
        $scope.onClickTab({
            title: 'Favorites'
        });
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Favorite/////////////////
    $scope.Favorite = function (id, url, name, flag) {
        var a, temp = [],favoriteIndex = [];
        if (localStorage.getItem(id) === null) {
            //console.log(localStorage);
            favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
            //console.log(favoriteIndex);
            favoriteIndex.push(id);
            localStorage.setItem('favoriteIndex',JSON.stringify(favoriteIndex));
            //a = '#'+id;
            //$(a).removeClass( "glyphicon-star-empty" ).addClass( "glyphicon-star" ).css('color', '#FED800');
            temp.push(url, name, flag, id);
            localStorage.setItem(id, JSON.stringify(temp));
        }
        else {
            favoriteIndex = JSON.parse(localStorage.getItem('favoriteIndex'));
            //console.log(favoriteIndex);
            favoriteIndex.splice(favoriteIndex.indexOf(id),1);
            //console.log(favoriteIndex);
            localStorage.setItem('favoriteIndex',JSON.stringify(favoriteIndex));
            localStorage.removeItem(id);
            
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PageChanging/////////////////////
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