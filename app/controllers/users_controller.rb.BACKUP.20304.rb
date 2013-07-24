class UsersController < ApplicationController
<<<<<<< HEAD
  def index
  end  
  def new
=======
	def index
    @users = User.all
>>>>>>> modeling-users
	end
end
