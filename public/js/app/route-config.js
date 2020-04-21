(function(){
    'use strict';
    angular.module('app')
    .config(config)

    config.$inject=['$routeProvider']

    function config($routeProvider){
        $routeProvider.when('/courses',{
            templateUrl:'js/app/courses/courses.html',
            controller:'CoursesController',
            controllerAs:'vm'
        })
    }
}());