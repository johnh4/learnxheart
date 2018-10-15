FactoryBot.define do
  factory :card_student_relationship do
    easiness { 0 }
    consecutive_correct_answers { 0 }
    next_due_date { DateTime.now + 1.day }
    card
    student
    deck
  end
end