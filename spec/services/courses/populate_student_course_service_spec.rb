require 'rails_helper'

RSpec.describe Courses::PopulateStudentCourseService, type: :service do
  it "creates the correct # of user card relationships" do
    count = 2
    course, deck = create_course_with_cards count
    student = create(:student)
    service = Courses::PopulateStudentCourseService.new(course, student)
    expect {
      service.execute
      course.reload
    }.to change(CardStudentRelationship, :count).by count
  end

  it "assigns card_user_relationships to the correct student and deck" do
    course, deck = create_course_with_cards 2
    student = create(:student)

    service = Courses::PopulateStudentCourseService.new(course, student)
    service.execute

    CardStudentRelationship.all.each do |relationship|
      expect(relationship.student).to eq student
      expect(relationship.deck).to eq deck
    end
  end

  def create_course_with_cards(count = 4)
    course = create(:course)
    student = create(:student)
    deck = create(:deck, course: course)
    count.times { create(:card, deck: deck) }
    [course, deck]
  end
end
