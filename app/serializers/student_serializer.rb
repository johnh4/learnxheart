class StudentSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :token, :type,
             :created_at, :updated_at
end
