require 'spec_helper'

describe "visit home page" do
  describe "GET /" do
    it "renders our homepage" do
    	visit root_path
    	expect(page).to have_content('yay')
    end
  end
end
