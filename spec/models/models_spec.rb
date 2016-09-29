require "rails_helper"

RSpec.describe  User, :type => :model do
  it "Expect's user instance can be created" do
    lindeman = User.create!(username: "Andy", email: "Lindeman@g.com", password: "12345678")
    chelimsky = User.create!(username: "David", email: "Chelimsky@test.com", password: "12345678")

    expect(User.all).to eq([lindeman, chelimsky])
  end

end
