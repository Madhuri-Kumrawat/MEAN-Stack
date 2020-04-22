var courses=require('../courses');
exports.getCourses=function(next){
    var allCourses=courses;
    return next(null,allCourses);
}
exports.getCourseDetails=function(courseId,next){
    var course=null;
    for(var i=0;i<courses.CourseCollection.length;i++){
        if(courses.CourseCollection[i].CourseId==courseId){
            course=courses.CourseCollection[i];
            break;
        }
    }
    next(null,course);
}