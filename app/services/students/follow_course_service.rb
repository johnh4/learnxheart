module Students
  class FollowCourseService
    attr_accessor :student
    attr_accessor :course

    def initialize(student, course)
      @student = student
      @course = course
    end

    def execute
      CourseUserRelationship.create(user: student, course: course)
    end
  end
end