(function(){
    'use strict';
    angular
    .module('app')
    .factory('api',apiFactory);
    apiFactory.$inject=['$http'];

    function apiFactory($http){
        return{
            getCourses:getCourses
        };
        function getCourses(){
            return $http.get('/home/api/courses').then(function(response){
                return response.data.CourseCollection;
            });
        }
    }


}());