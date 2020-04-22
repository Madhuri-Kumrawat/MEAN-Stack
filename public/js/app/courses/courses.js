(function(){
    'use strict';
    angular.module('app')
    .controller('CoursesController',CoursesController);
    CoursesController.$inject=['api'];
    
    function CoursesController(api){
        var vm=this;
        api.getCourses().then(function(data){
            vm.courses=data;
        });
    }


    /*
    function CoursesController($http){
        this.data="Courses data";
        var vm=this;
        $http.get('/home/api/courses').then(function(response){
            vm.courses=response.data.CourseCollection;
        },
        function(reason){
            console.log(reason);
        })//this way promise will always be resolved in case of exception
        .catch(function(err){
            console.log(err);
        });
    }*/
}());