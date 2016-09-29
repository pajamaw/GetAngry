class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  ##getting error [active_model_serializers] Rendered ActiveModel::Serializer::Null with Hash (0.08ms)
##coming from trying to serialize the json
end
