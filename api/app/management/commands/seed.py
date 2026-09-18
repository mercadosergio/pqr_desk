from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

from app.models import Client, Comment, Pqr, User


class Command(BaseCommand):
    help = "Crea datos iniciales para desarrollo y demostración."

    def handle(self, *args, **options):
        users = {}
        user_data = [
            {
                "name": "Ana Agente",
                "email": "ana.agente@example.com",
                "role": User.Role.AGENT,
                "password": "Agente123!",
            },
            {
                "name": "Carlos Supervisor",
                "email": "carlos.supervisor@example.com",
                "role": User.Role.SUPERVISOR,
                "password": "Supervisor123!",
            },
        ]

        for data in user_data:
            password = data.pop("password")
            user, created = User.objects.get_or_create(
                email=data["email"],
                defaults={
                    **data,
                    "password_hash": make_password(password),
                },
            )
            if not created and not user.password_hash:
                user.password_hash = make_password(password)
                user.save(update_fields=["password_hash"])
            users[user.email] = user

        clients = {}
        client_data = [
            {
                "name": "Laura",
                "last_name": "Gómez",
                "dni": "100000001",
                "email": "laura.gomez@example.com",
                "phone": "3000000001",
            },
            {
                "name": "Miguel",
                "last_name": "Torres",
                "dni": "100000002",
                "email": "miguel.torres@example.com",
                "phone": "3000000002",
            },
        ]

        for data in client_data:
            client, _ = Client.objects.get_or_create(dni=data["dni"], defaults=data)
            clients[client.dni] = client

            client_user, created = User.objects.get_or_create(
                email=client.email,
                defaults={
                    "name": f"{client.name} {client.last_name}",
                    "role": User.Role.CLIENT,
                    "password_hash": make_password(client.dni),
                },
            )
            if not created and not client_user.password_hash:
                client_user.password_hash = make_password(client.dni)
                client_user.save(update_fields=["password_hash"])
            users[client_user.email] = client_user

        pqr_data = [
            {
                "title": "Demora en la respuesta de una solicitud",
                "type": Pqr.Type.COMPLAINT,
                "description": "La persona solicita conocer el estado de su trámite.",
                "category": "Atención al cliente",
                "priority": Pqr.Priority.HIGH,
                "status": Pqr.Status.IN_PROGRESS,
                "channel": Pqr.Channel.WEB,
                "client": clients["100000001"],
            },
            {
                "title": "Solicitud de certificado",
                "type": Pqr.Type.PETITION,
                "description": "Solicitud de expedición de certificado de servicio.",
                "category": "Documentación",
                "priority": Pqr.Priority.MEDIUM,
                "status": Pqr.Status.RECEIVED,
                "channel": Pqr.Channel.EMAIL,
                "client": clients["100000002"],
            },
            {
                "title": "Solicitud de documentos legales",
                "type": Pqr.Type.PETITION,
                "description": "Solicitud de registro civil",
                "category": "Documentación",
                "priority": Pqr.Priority.MEDIUM,
                "status": Pqr.Status.RECEIVED,
                "channel": Pqr.Channel.EMAIL,
                "client": clients["100000002"],
            },
        ]

        for data in pqr_data:
            pqr, _ = Pqr.objects.get_or_create(title=data["title"], defaults=data)
            Comment.objects.get_or_create(
                pqr=pqr,
                description="Solicitud recibida y asignada para revisión.",
                defaults={
                    "action_type": "assignment",
                    "user": users["carlos.supervisor@example.com"],
                },
            )

            client_user = users[pqr.client.email]
            conversation = [
                (
                    client_user,
                    "Hola, quisiera conocer el avance de mi solicitud.",
                ),
                (
                    users["ana.agente@example.com"],
                    "Hola. Estamos revisando tu caso y validando la información recibida.",
                ),
                (
                    client_user,
                    "Gracias. ¿Cuándo podría recibir una respuesta definitiva?",
                ),
                (
                    users["ana.agente@example.com"],
                    "Te confirmaremos la respuesta tan pronto termine la revisión.",
                ),
            ]

            for user, description in conversation:
                Comment.objects.get_or_create(
                    pqr=pqr,
                    user=user,
                    description=description,
                    defaults={"action_type": "message"},
                )

        self.stdout.write(self.style.SUCCESS("Datos generados correctamente."))
