class RemoveFrontAndBackFromCardUserRelationships < ActiveRecord::Migration[5.2]
  def change
    remove_column :card_user_relationships, :front, :text
    remove_column :card_user_relationships, :back, :text
  end
end
