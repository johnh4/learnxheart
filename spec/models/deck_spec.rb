require 'rails_helper'

RSpec.describe Deck, type: :model do
  context "associations" do
    it "can belong to a course" do
      course = create(:course)
      deck = create(:deck, course: course)
      expect(deck.course).to eq course
    end

    it "can have cards" do
      deck = create(:deck)
      expect { 
        deck.cards.create(attributes_for(:card))
      }.to change(deck.cards, :count).by 1
    end

    it "can have card_student_relationships" do
      deck = create(:deck)
      card_student_relationship = create(:card_student_relationship, deck: deck)
      expect(deck.card_student_relationships).to include card_student_relationship
    end
  end
end
