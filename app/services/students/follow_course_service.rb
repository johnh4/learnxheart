module Students
  class FollowCourseService
    attr_accessor :student
    attr_accessor :course

    def initialize(student, course)
      @student = student
      @course = course
    end

    def execute
      CourseStudentRelationship.create(student: student, course: course)
      Courses::PopulateStudentCourseService.new(course, student).execute
    end
  end
end