Rails.application.routes.draw do
  resources :forum_posts
  resources :pic_posts
  resources :comments
  resources :forums
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
