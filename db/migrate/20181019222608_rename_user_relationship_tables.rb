class RenameUserRelationshipTables < ActiveRecord::Migration[5.2]
  def change
    rename_table :course_user_relationships, :course_student_relationships
    rename_table :card_user_relationships, :card_student_relationships
  end
end
