Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_for :users
  namespace :api, defaults: { format: :json } do
    resources :sessions, only: [:create, :destroy]
    resources :educators, only: [:index, :show, :create, :update, :destroy]
    resources :students, only: [:show, :create, :update, :destroy]

    resources :courses, only: [:index, :create, :show, :update]
    resources :decks, only: [:index, :create, :show, :update]
    resources :cards, only: [:index, :create, :show, :update]
    resources :course_student_relationships, only: [:index, :create, :destroy]
  end

  # root to: "home#index"
end
