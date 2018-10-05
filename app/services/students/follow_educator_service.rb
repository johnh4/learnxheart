module Students
  class FollowEducatorService
    attr_accessor :student
    attr_accessor :educator

    def initialize(student, educator)
      @student = student
      @educator = educator
    end

    def execute
      EducatorStudentRelationship.create(student: student, educator: educator)
    end
  end
end