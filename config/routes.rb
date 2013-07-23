TravelApp::Application.routes.draw do
        # resources :controller name
  root 'users#index'
  resources :users
  # '/users/new'

end
