Rails.application.routes.draw do
 
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "homes#top"
  resources :users 
  resources :wishes do
    resources :complete_reviews
  end
get "wishes/dones" => "wishes#dones"
resources :tags
end
