require 'rails_helper'

RSpec.describe Students::FollowCourseService, type: :service do
  it "can have students" do
    course = create(:course)
    student = create(:student)
    service = Students::FollowCourseService.new(student, course)
    expect {
      service.execute
    }.to change(course.students, :count).by 1
  end

  it "populates student cards" do
    course = create(:course)
    student = create(:student)

    expect_any_instance_of(Courses::PopulateStudentCourseService).to receive(:execute)

    service = Students::FollowCourseService.new(student, course)
    service.execute
  end
end