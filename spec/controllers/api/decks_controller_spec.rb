require 'rails_helper'

RSpec.describe Api::DecksController, type: :controller do

  describe "GET #index" do
    it "returns the correct courses" do
      deck_1 = create(:deck)
      deck_2 = create(:deck)

      get :index

      decks_response = json_response
      ids = deck_ids_from_response decks_response
      expect(ids).to match [deck_1.id, deck_2.id]
      expect(decks_response.length).to be 2
      expect(response.status).to eq 200
    end
  end

  describe "GET #show" do
    it "shows the correct deck" do
      deck = create(:deck)

      get :show, params: { id: deck.id }

      deck_response = json_response
      expect(deck_response[:name]).to eq deck.name
    end
  end

  describe "POST #create" do
    RSpec.shared_examples_for "a failed deck creation" do
      it "doesn't create the deck" do
        deck = attributes_for(:deck)
        course = create(:course)

        expect {
          post :create, params: { deck: deck, course_id: course.id }
        }.to_not change(Deck, :count)
      end

      it "returns a 403 status" do
        post :create, params: { deck: attributes_for(:deck) }

        expect(response.status).to eq 403
      end
    end

    context "when signed in as an educator" do
      it "creates the deck when the educator owns the course" do
        educator = sign_in_educator
        course = create(:course, educator: educator)
        deck = attributes_for(:deck, course_id: course.id)

        expect {
          post :create, params: { deck: deck }
        }.to change(Deck, :count).by(1)
      end

      it "doesn't create the deck when the educator doesn't own the course" do
        course = create(:course)
        deck = attributes_for(:deck, course_id: course.id)
        sign_in_educator

        expect {
          post :create, params: { deck: deck }
        }.to_not change(Deck, :count)
      end
    end

    context "when not signed in" do
      it_behaves_like "a failed deck creation"
    end

    context "when signed in as a student" do
      before do
        sign_in_student
      end

      it_behaves_like "a failed deck creation"
    end
  end

  describe "PATCH #update" do
    context "when updating your own deck" do
      context "for a successful update" do
        it "updates then renders the deck" do
          deck, educator = create_deck_with_educator
          name = "New deck name"
          sign_in educator

          patch :update, params: { id: deck.id, deck: { name: name } }

          deck_response = json_response
          expect(deck_response[:name]).to eq name
          expect(response.status).to eq 200
        end
      end
    end

    context "when not updating your own deck" do
      it "doesn't update the deck" do
          deck, educator = create_deck_with_educator
          other_educator = create(:educator)
          name = "New deck name"
          sign_in other_educator

          patch :update, params: { id: deck.id, deck: { name: name } }

          deck_response = json_response
          expect(deck_response[:name]).to_not eq name
          expect(response.status).to eq 403
      end
    end
  end

  def create_deck_with_educator
    deck = create(:deck)
    [deck, deck.course.educator]
  end

  def deck_ids_from_response decks_response
    decks_response.map { |d| d[:id] }
  end
end
