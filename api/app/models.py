from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dni = models.CharField(max_length=10, unique=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} {self.last_name}"


class User(models.Model):

    class Role(models.TextChoices):
        AGENT = "agent", "Agente"
        SUPERVISOR = "supervisor", "Supervisor"
        ADMIN = "admin", "Admin"
        CLIENT = "client", "Cliente"

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Role.choices)
    password_hash = models.CharField(max_length=255)

    def __str__(self):
        return self.email


class Pqr(models.Model):

    class Type(models.TextChoices):
        PETITION = "petition", "Petición"
        COMPLAINT = "complaint", "Queja"
        CLAIM = "claim", "Reclamo"

    class Priority(models.TextChoices):
        LOW = "low", "Baja"
        MEDIUM = "medium", "Media"
        HIGH = "high", "Alta"
        URGENT = "urgent", "Urgente"

    class Status(models.TextChoices):
        RECEIVED = "received", "Recibida"
        IN_PROGRESS = "in_progress", "En gestión"
        RESOLVED = "resolved", "Resuelta"
        CLOSED = "closed", "Cerrada"

    class Channel(models.TextChoices):
        WEB = "web", "Web"
        EMAIL = "email", "Email"
        IN_PERSON = "in_person", "Presencial"

    type = models.CharField(max_length=20, choices=Type.choices)
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    priority = models.CharField(max_length=20, choices=Priority.choices)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.RECEIVED
    )
    channel = models.CharField(max_length=20, choices=Channel.choices)
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="pqrs")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.title


class Comment(models.Model):
    description = models.TextField()
    action_type = models.CharField(max_length=100)
    registered_at = models.DateTimeField(auto_now_add=True)

    pqr = models.ForeignKey(Pqr, on_delete=models.CASCADE, related_name="comments")

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="comments"
    )

    # def __str__(self):
    #     return f"Comment #{self.id} - PQR #{self.pqr_id}"
