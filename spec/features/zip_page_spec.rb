require "rails_helper"

##RSpec.describe 'creating a user', type: :feature do
##  describe "Online form" do
  ##  it 'successfully creates a new user' do
  feature "going to the home path", js: true do
    scenario 'find the input bar' do
      visit '/'

      expect(page).to have_content('What neighborhood')
    end
  end

#      visit root_path
#    expect(page).to have_content 'What neighborhood are you interested in'      click_link('Register')
#
#      within ('form#reg-form') do
#        fill_in '#username-reg', with: 'Myusername'
#        fill_in '#email-reg', with: 'email@gmail.com'
#        fill_in '#password-reg', with: 'password1'
#      end
#      click_button 'Sign Up'
#
#      expect(page).to have_content 'Search'
#      expect(page).to have_content 'Myusername'
#    end
#  end
#end
