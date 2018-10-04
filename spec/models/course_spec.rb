require 'rails_helper'

RSpec.describe Course, type: :model do
  context "associations" do
    it "can belong to an educator" do
      educator = create(:educator)
      course = create(:course, educator: educator)
      expect(course.educator).to eq educator
    end

    it "can have students" do
      course = create(:course)
      student = create(:student)
      expect {
        Students::FollowCourseService.new(student, course).execute
      }.to change(course.students, :count).by 1
    end
  end
end
