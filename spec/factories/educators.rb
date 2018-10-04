FactoryBot.define do 
  factory :educator do
    type { "Educator" }
    sequence(:email) { |n| "educator-#{n}@example.com" }
    password { "password" }
  end
end