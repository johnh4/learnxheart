class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :name
      t.integer :educator_id

      t.timestamps
    end

    add_index :courses, :educator_id
  end
end
