class Api::CardsController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def index
    respond_with @cards
  end

  def show
    respond_with @card
  end

  def create
  end

  def update
    if @card.update(card_params)
      render json: @card, status: 200, location: [:api, @card]
    else
      render json: { errors: @card.errors }, status: 422
    end
  end

  private

  def card_params
    params.require(:card).permit(:id, :front, :back, :easiness, :consecutive_correct_answers, :next_due_date)
  end
end