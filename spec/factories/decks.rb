FactoryBot.define do
  factory :deck do
    course
    sequence(:name) { |n| "Deck #{n}"}
  end
end
