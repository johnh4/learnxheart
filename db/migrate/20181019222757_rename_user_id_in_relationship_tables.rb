class RenameUserIdInRelationshipTables < ActiveRecord::Migration[5.2]
  def change
    rename_column :card_student_relationships, :user_id, :student_id
    rename_column :course_student_relationships, :user_id, :student_id
  end
end
