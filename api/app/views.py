from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from .models import Client, Comment, Pqr, User
from .serializers import (
    ClientSerializer,
    CommentSerializer,
    UserSerializer,
    PqrSerializer,
)


class ClientView(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ClientSerializer


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("pqr", "user").all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CommentSerializer

    def add_comment(self, request, *args, **kwargs):
        pqr = get_object_or_404(Pqr, pk=kwargs["id"])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment = serializer.save(pqr=pqr)

        return Response(
            self.get_serializer(comment).data, status=status.HTTP_201_CREATED
        )

    def get_comments_by_pqr(self, request, *args, **kwargs):
        pqr = get_object_or_404(Pqr, pk=kwargs["id"])

        comments = self.get_queryset().filter(pqr=pqr)

        serializer = self.get_serializer(comments, many=True)

        return Response(serializer.data)


class PqrView(viewsets.ModelViewSet):
    queryset = Pqr.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PqrSerializer
    lookup_field = "id"

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        filters = {
            field: request.query_params[field]
            for field in ("type", "priority", "status")
            if request.query_params.get(field)
        }
        queryset = queryset.filter(**filters)

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        pqr = self.get_object()

        serializer = self.get_serializer(pqr)

        return Response(serializer.data)

    def change_status(self, request, *args, **kwargs):
        pqr = self.get_object()

        serializer = self.get_serializer(pqr, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def search(self, request, *args, **kwargs):
        radicado = request.query_params.get("radicado")

        if not radicado:
            return Response(
                {"detail": "radicado is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        queryset = self.get_queryset().filter(id=radicado)

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)
