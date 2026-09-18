# PQR Desk

## Descripción

PQR Desk es una aplicación web para registrar, consultar y gestionar peticiones, quejas y reclamos. Está compuesta por un frontend desarrollado con Angular y una API REST desarrollada con Django REST Framework.

La aplicación permite al equipo encargado:

- Consultar las solicitudes registradas y filtrarlas por tipo, prioridad y estado.
- Crear nuevas PQR con información del cliente, categoría, canal y descripción.
- Consultar el detalle de una solicitud y la información de su cliente.
- Actualizar la prioridad y el estado de una PQR.
- Registrar y consultar mensajes de seguimiento de cada solicitud.

### Arquitectura

- **Frontend:** Angular 22.
- **Backend:** Django 5, Django REST Framework y SQLite.
- **Documentación de API:** Swagger UI.

La documentación interactiva está disponible en:

- Swagger UI: `http://127.0.0.1:4000/api/schema/swagger-ui/`

## Requisitos

- Python 3.9+ (path configurado en las variables de entorno)
- Node.js 22+

## Instalación

1. Abra la terminal y clone el repositorio: `git clone https://github.com/mercadosergio/pqr_desk.git`
2. Activar el entorno virtual de Python. Para ello debe ubicarse en la carpeta raíz del backend:
```bash
cd api
.\venv\Scripts\Activate.ps1

```

3. Instalar dependencias del API.
```bash
pip install -r requirements.txt

```

4. Crear y ejecutar migraciones
```bash
python manage.py makemigrations
python manage.py migrate

```

5. Ejecutar API y desplegarla en el puerto 4000.
```bash
python manage.py runserver 4000

```

6. Ubicarse en la carpeta raíz del frontend e instalar dependencias.
```bash
cd frontend
npm install

```

7. Ejecutar la aplicación frontend.
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`.


## Autor 🖋️

Sergio Mercado Salazar

- [Linkedin](https://www.linkedin.com/in/devsergiom/)
- [Github](https://github.com/mercadosergio)