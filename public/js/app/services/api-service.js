(function(){
    'use strict';
    angular
    .module('app')
    .factory('api',apiFactory);
    apiFactory.$inject=['$http'];

    function apiFactory($http){
        return{
            getCourses:getCourses,
            getCourseDetails:getCourseDetails
        };
        function getCourses(){
            return $http.get('/home/api/courses').then(function(response){
                return response.data.CourseCollection;
            });
        }
        function getCourseDetails(courseId){
            return $http.get('/home/api/course-details/'+courseId).then(function(response){
                return response.data;
            });
        }
    }


}());