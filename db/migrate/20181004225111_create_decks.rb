class CreateDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :decks do |t|
      t.references :course, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
