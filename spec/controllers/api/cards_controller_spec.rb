require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do

  describe "GET #index" do
    it "returns the correct cards" do
      card_1 = create(:card)
      card_2 = create(:card)

      get :index

      cards_response = json_response
      ids = card_ids_from_response cards_response
      expect(ids).to match [card_1.id, card_2.id]
      expect(cards_response.length).to be 2
      expect(response.status).to eq 200
    end
  end

  describe "GET #show" do
    it "shows the correct card" do
      card = create(:card)

      get :show, params: { id: card.id }

      card_response = json_response
      expect(card_response[:front]).to eq card.front
    end
  end

  describe "PATCH #update" do
    context "for a successful update" do
      it "updates then renders the card" do
        educator = sign_in_educator
        card = create(:card, consecutive_correct_answers: 0)
        card.deck.course.update(educator: educator)
        front = "My updated front"

        patch :update, params: { id: card.id, card: { front: front } }

        card_response = json_response
        expect(card_response[:front]).to eq front
        expect(response.status).to eq 200
      end
    end

    xcontext "for a failed update" do
      it "renders errors" do
        #TODO: use a condition that fails validation

        card_response = json_response
        expect(card_response).to have_key(:errors)
        expect(response.status).to eq 422
      end
    end
  end

  def card_ids_from_response cards_response
    cards_response.map { |c| c[:id] }
  end
end