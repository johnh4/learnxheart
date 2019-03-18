require 'rails_helper'

RSpec.describe CardStudentRelationship, type: :model do
  describe "associations" do
    it "can belong to a student" do
      card_student_relationship = create(:card_student_relationship, student: create(:student))
      expect(card_student_relationship.student).to be_instance_of(Student)
    end

    it "can belong to a deck" do
      card_student_relationship = create(:card_student_relationship)
      expect(card_student_relationship.deck).to be_instance_of(Deck)
    end

    it "can belong to a card" do
      card_student_relationship = create(:card_student_relationship)
      expect(card_student_relationship.card).to be_instance_of(Card)
    end
  end
end
