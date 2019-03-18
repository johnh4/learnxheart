FactoryBot.define do
  factory :user do
    type { "User" }
    sequence(:email) { |n| "user-#{n}@example.com" }
    password { "password" }
  end
end
