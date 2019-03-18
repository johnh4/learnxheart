class Api::DecksController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def index
    respond_with @decks
  end

  def show
    respond_with @deck
  end

  def create
    if @deck.save
      render json: @deck, status: 201, location: [:api, @deck]
    else
      render json: { errors: @deck.errors }, status: 422
    end
  end

  def update
    if @deck.update(deck_params)
      render json: @deck, status: 200, location: [:api, @deck]
    else
      render json: { errors: @deck.errors }, status: 422
    end
  end

  private

  def deck_params
    params.require(:deck).permit(:name, :course_id)
  end
end

