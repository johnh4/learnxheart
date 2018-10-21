require 'rails_helper'

RSpec.describe Card, type: :model do
  context "associations" do
    it "can have a deck" do
      deck = create(:deck)
      card = create(:card, deck: deck)
      expect(card.deck).to eq deck
    end

    it "can have card_student_relationships" do
      card = create(:card)
      card_student_relationship = create(:card_student_relationship, card: card)
      expect(card.card_student_relationships).to include card_student_relationship
    end
  end
end
