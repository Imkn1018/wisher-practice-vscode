Rails.application.routes.draw do

   devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "homes#top"
  resource :users
  resources :wishes do
    resources :complete_reviews
  end

  get "dones" => "wishes#dones",as: :wishes_dones
  patch "wishes/:id/complete" => "wishes#complete", as: :wishes_complete
  resources :tags
  scope "spa" do
    get "*path", to:  'spa_roots#show'
  end
  post "/wish_tag_relationships", to: "wish_tag_relationships#create"
  delete "wish_tag_relationships/destroy", to: "wish_tag_relationships#destroy"
end
