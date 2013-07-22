require 'spec_helper'

describe "TravelApps" do
  describe "GET /users" do
    it "shows create user form" do
    	visit users_path
    end
  end
end
