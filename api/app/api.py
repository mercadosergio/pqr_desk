from .models import Pqr
from rest_framework import viewsets, permissions
from .serializers import PqrListSerializer


class PqrViewSet(viewsets.ModelViewSet):
    queryset = Pqr.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PqrSerializer
