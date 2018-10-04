class CreateEducatorStudentRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :educator_student_relationships do |t|
      t.integer :student_id
      t.integer :educator_id

      t.timestamps
    end

    add_index :educator_student_relationships, [:student_id, :educator_id], name: "educator_student_index"
  end
end
