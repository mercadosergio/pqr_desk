from django.urls import include, path
from rest_framework import routers
from .views import PqrView, ClientView, CommentView, UserView

router = routers.DefaultRouter()

router.register(r"clients", ClientView, basename="clients")
router.register(r"users", UserView, basename="users")

urlpatterns = [
    path("", include(router.urls)),
    path("pqr", PqrView.as_view({"get": "list", "post": "create"})),
    path("pqr/buscar", PqrView.as_view({"get": "search"})),
    path("pqr/<int:id>", PqrView.as_view({"get": "retrieve"})),
    path("pqr/<int:id>/estado", PqrView.as_view({"patch": "change_status"})),
    path(
        "pqr/<int:id>/seguimiento",
        CommentView.as_view({"get": "get_comments_by_pqr", "post": "add_comment"}),
    ),
]
