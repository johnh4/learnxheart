class CreateCardUserRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :card_user_relationships do |t|
      t.references :card, foreign_key: true
      t.references :user, foreign_key: true
      t.references :deck, foreign_key: true
      t.float :easiness
      t.text :front
      t.text :back
      t.integer :consecutive_correct_answers
      t.datetime :next_due_date

      t.timestamps
    end

    add_index :card_user_relationships, [:card_id, :user_id], name: "card_user_index"
    add_index :card_user_relationships, [:card_id, :deck_id], name: "card_deck_index"
  end
end
