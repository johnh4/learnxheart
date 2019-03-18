FactoryBot.define do
  factory :card do
    sequence(:front) { |n| "Card front #{n}" }
    sequence(:back) { |n| "Card back #{n}" }
    easiness { 0 }
    consecutive_correct_answers { 0 }
    next_due_date { DateTime.now + 1.day }
    deck
  end
end
