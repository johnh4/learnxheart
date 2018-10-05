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
  end
end
