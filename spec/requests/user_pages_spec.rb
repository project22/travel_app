require 'spec_helper'

<<<<<<< HEAD
describe "User Pages" do
  subject { page }
  describe "signup page" do
    before { visit signup_path }
    
    it { should have_content('sign up') }
    it { should have_title('Sign up') }
    
  end
end
=======
describe User do

  before do
    @user = User.new(name: "Example User", email: "user@example.com", password: "foobar", password_confirmation: "foobar")
  end

  subject { @user }

  it { should respond_to(:name) }
  it { should respond_to(:email) }
  it { should respond_to(:password_digest) }
  #rails generate migration add_password_digest_to_users password_digest:string
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should respond_to(:authenticate) }



  it { should be_valid }
  #validates presence of name
  describe "when name is not present" do
    before { @user.name = " " }
    it { should_not be_valid }
  end
  #validates that the password is not empty and doesn't match the confirmation 
  describe "when password is not present" do
    before do
      @user = User.new(name: "Example User", email: "user@example.com",
                       password: " ", password_confirmation: " ")
    end
    it { should_not be_valid }
  end

  describe "when password doesn't match confirmation" do
    before { @user.password_confirmation = "mismatch" }
    it { should_not be_valid }
  end
  describe "with a password that's too short" do
    before { @user.password = @user.password_confirmation = "a" * 5 }
    it { should be_invalid }
  end

  describe "return value of authenticate method" do
    before { @user.save }
    let(:found_user) { User.find_by(email: @user.email) }

    describe "with valid password" do
      it { should eq found_user.authenticate(@user.password) }
    end

    describe "with invalid password" do
      let(:user_for_invalid_password) { found_user.authenticate("invalid") }

      it { should_not eq user_for_invalid_password }
      specify { expect(user_for_invalid_password).to be_false }
    end
  end
end
>>>>>>> modeling-users
