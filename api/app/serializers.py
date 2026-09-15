from rest_framework import serializers
from .models import Client, Comment, Pqr, User


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ("name", "last_name", "dni", "email", "phone")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email", "role")


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "pqr", "description", "action_type", "registered_at", "user")
        read_only_fields = ("id", "pqr", "registered_at", "user")


class PqrListSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)

    class Meta:
        model = Pqr
        fields = (
            "id",
            "type",
            "title",
            "category",
            "priority",
            "status",
            "channel",
            "client",
            "created_at",
            "updated_at",
        )


class PqrDetailSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Pqr
        fields = "__all__"
        read_only_fields = ("id", "status", "created_at", "updated_at")
