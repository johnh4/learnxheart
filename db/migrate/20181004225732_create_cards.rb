class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.references :deck, foreign_key: true
      t.text :front
      t.text :back
      t.float :easiness
      t.integer :consecutive_correct_answers
      t.datetime :next_due_date

      t.timestamps
    end
  end
end
