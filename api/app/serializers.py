from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Client, Comment, Pqr, User


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ("id", "name", "last_name", "dni", "email", "phone")


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=8)

    class Meta:
        model = User
        fields = ("id", "name", "email", "role", "password")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        if password is None:
            raise serializers.ValidationError(
                {"password": "Este campo es obligatorio."}
            )

        validated_data["password_hash"] = make_password(password)
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password is not None:
            instance.password_hash = make_password(password)

        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)

        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "pqr", "description", "action_type", "registered_at", "user")
        read_only_fields = ("id", "pqr", "registered_at", "user")


class PqrSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        source="client", queryset=Client.objects.all(), write_only=True
    )
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Pqr
        fields = [
            "id",
            "type",
            "title",
            "category",
            "priority",
            "description",
            "status",
            "channel",
            "client",
            "client_id",
            "comments",
            "created_at",
            "updated_at",
        ]


class PqrEstadoSerializer(serializers.Serializer):

    status = serializers.ChoiceField(choices=Pqr.Status.choices, required=False)
    priority = serializers.ChoiceField(choices=Pqr.Priority.choices, required=False)
    comment = serializers.CharField(required=False, allow_blank=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, allow_null=True, source="user"
    )

    def validate(self, data):
        if "status" not in data and "priority" not in data:
            raise serializers.ValidationError(
                "Debe enviar al menos 'status' o 'priority'."
            )
        return data
