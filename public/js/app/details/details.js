(function(){
    'use strict';
    angular.module('app')
    .controller('DetailsController',CoursesController);
    CoursesController.$inject=['api','$routeParams'];
    
    function CoursesController(api,$routeParams){
        var vm=this;
        api.getCourseDetails($routeParams.courseId).then(function(data){
            vm.course=data;
        });
    }
}());