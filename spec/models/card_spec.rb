require 'rails_helper'

RSpec.describe Card, type: :model do
  context "associations" do
    it "can have a deck" do
      deck = create(:deck)
      card = create(:card, deck: deck)
      expect(card.deck).to eq deck
    end
  end
end
