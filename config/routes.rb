Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_for :users
  namespace :api, defaults: { format: :json } do
    resources :educators, only: [:index, :show, :create, :update, :destroy]
    resources :students, only: [:show, :create, :update, :destroy]

    resources :courses, only: [:index, :create, :show, :update]
    resources :decks, only: [:index, :create, :show, :update]
    resources :cards, only: [:index, :create, :show, :update]
  end

  # root to: "home#index"
end
