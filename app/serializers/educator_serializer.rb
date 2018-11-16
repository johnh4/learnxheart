class EducatorSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :type,
             :created_at, :updated_at
  attribute :token, if: -> { instance_options[:show_token] }
end
