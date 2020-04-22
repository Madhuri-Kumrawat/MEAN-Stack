(function(){
    'use strict';
    angular.module('app')
    .config(config)

    config.$inject=['$routeProvider']

    function config($routeProvider){
        $routeProvider
        .when('/courses',{
            templateUrl:'js/app/courses/courses.html',
            controller:'CoursesController',
            controllerAs:'vm'
        })
        .when('/details/:courseId',{
            templateUrl:'js/app/details/details.html',
            controller:'DetailsController',
            controllerAs:'vm'
        })
        .when('/payment',{
            templateUrl:'js/app/payment/payment.html',
            controller:'PaymentController',
            controllerAs:'vm'
        })

    }
}());