require "rails_helper"

feature 'Register Screen', js: true do
  scenario 'Allows a new user to register' do
    visit '/'

    click_link('Register')
    within ('form#reg-form') do
      fill_in 'username-reg', with: 'Myusername'
      fill_in 'email-reg', with: 'email@gmail.com'
      fill_in 'password-reg', with: 'password1'
    end
    click_button 'Sign Up'

    expect(page).to have_content 'Profile'
    expect(page).to have_content 'Myusername'
  end
  scenario 'can access profile page' do
    visit '/'

    click_link('Register')
    within ('form#reg-form') do
      fill_in 'username-reg', with: 'Myusername'
      fill_in 'email-reg', with: 'email@gmail.com'
      fill_in 'password-reg', with: 'password1'
    end
    click_button 'Sign Up'

    click_link('Profile')
    expect(page).to have_content 'Keywords'
  end
end
