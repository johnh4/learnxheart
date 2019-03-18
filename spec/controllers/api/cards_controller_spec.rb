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

  describe "POST #create" do
    RSpec.shared_examples_for "a failed card creation" do
      it "doesn't create the card" do
        card = attributes_for(:card)
        deck = create(:deck)

        expect {
          post :create, params: { card: card, deck_id: deck.id }
        }.to_not change(Card, :count)
      end

      it "returns a 403 status" do
        post :create, params: { card: attributes_for(:card) }

        expect(response.status).to eq 403
      end
    end

    context "when signed in as an educator" do
      context "who owns the deck" do
        it "creates the card when the educator owns the deck" do
          educator = sign_in_educator
          course = create(:course, educator: educator)
          deck = create(:deck, course: course)
          card = attributes_for(:card, deck_id: deck.id)

          expect {
            post :create, params: { card: card }
          }.to change(Card, :count).by(1)
        end
      end

      it "doesn't create the card when the educator doesn't own the deck" do
        deck = create(:deck)
        card = attributes_for(:card, deck_id: deck.id)
        sign_in_educator

        expect {
          post :create, params: { card: card }
        }.to_not change(Card, :count)
      end
    end

    context "when not signed in" do
      it_behaves_like "a failed card creation"
    end

    context "when signed in as a student" do
      before do
        sign_in_student
      end

      it_behaves_like "a failed card creation"
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
  end

  def card_ids_from_response cards_response
    cards_response.map { |c| c[:id] }
  end
end