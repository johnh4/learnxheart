module Courses
  class PopulateStudentCourseService
    attr_accessor :course
    attr_accessor :student

    def initialize(course, student)
      @course = course
      @student = student
    end

    def execute
      course.decks.each do |deck|
        generate_card_relationships_for_deck deck
      end
    end

    private

    def generate_card_relationships_for_deck deck
      deck.cards.find_each do |card|
        CardStudentRelationship.create(card: card, student: student, deck: deck)
      end
    end
  end
end
