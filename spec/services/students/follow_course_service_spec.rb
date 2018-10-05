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
end