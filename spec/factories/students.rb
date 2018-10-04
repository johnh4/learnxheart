FactoryBot.define do 
  factory :student do
    type { "Student" }
    sequence(:email) { |n| "student-#{n}@example.com" }
    password { "password" }
  end
end