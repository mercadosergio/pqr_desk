# PQR Desk

## Descripción

PQR Desk es una aplicación web para registrar, consultar y gestionar peticiones, quejas y reclamos. Está compuesta por un frontend desarrollado con Angular y una API REST desarrollada con Django REST Framework.

La aplicación permite al equipo encargado:

- Consultar las solicitudes registradas y filtrarlas por tipo, prioridad y estado.
- Crear nuevas PQR con información del cliente, categoría, canal y descripción.
- Consultar el detalle de una solicitud y la información de su cliente.
- Actualizar la prioridad y el estado de una PQR.
- Registrar y consultar mensajes de seguimiento de cada solicitud.


> Nota: Aunque no posee un sistema de autenticación, este MVP muestra el flujo de solicitud y atención de PQRs desde los distintos roles propuestos. 

## Historias de usuario
| #   | Historia de usuario                                                                                                                                                    | Actor            | Prioridad |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------- |
| 1   | Como cliente necesito registrar y enciar una PQR para dejar constancia formal de mi solicitud                                                                          | Ciudadano        | Alta      |
| 2   | Como cliente quiero consultar el estado de mi PQR usando su número de radicado                                                                                         | Ciudadano        | Alta      |
| 3   | Como usuario del sistema/agente necesito listar las PQR filtrando por tipo, estado, prioridad y categoría, para priorizar mi carga de trabajo                          | Agente           | Alta      |
| 4   | Como usuario del sistema/agente quiero ver el detalle completo de una PQR junto con su historial de seguimiento, para entender el contexto antes de actuar             | Agente           | Alta      |
| 5   | Como usuario del sistema/agente quiero cambiar el estado y la prioridad de una PQR, para reflejar el avance real de la gestión                                         | Agente           | Alta      |
| 6   | Como usuario del sistema/agente quiero agregar entradas de seguimiento o comentarios internos a una PQR, para documentar las acciones realizadas sin alterar su estado | Agente           | Alta      |
| 7   | Como supervisor quiero ver estadísticas básicas de PQR por estado y por tipo, para monitorear la carga y el desempeño del equipo                                       | Supervisor/Admin | Media     |
| 8   | Como admin quiero gestionar los usuarios/agentes y sus roles (agente/supervisor/admin), para controlar el acceso al sistema                                            | Admin            | Media     |

### Arquitectura

- **Frontend:** Angular 22.
- **Backend:** Django 5, Django REST Framework y SQLite.
- **Documentación de API:** Swagger UI.

La documentación interactiva está disponible en:

- Swagger UI: `http://127.0.0.1:4000/api/schema/swagger-ui/`

## Capturas de la aplicación

### Home
![Home](/assets/pqr-desk-home.png)

### Detalle
![Detalle](/assets/pqr-desk-detail.png)

### Formulario de registro
![Formulario de registro](/assets/pqr-desk-form.png)

### Dashboard
![Dashboard](/assets/pqr-desk-dashboard.png)

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

5. Ejecutar API y desplegarla en el puerto 8000.
```bash
python manage.py runserver 8000

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


## Pasos para iniciar con Docker

1. En la terminal, ubicarse en la carpeta raíz del backend `cd api`, y levantar el contenedor.
```bash
docker compose up -d --build

```

2. Crear y realizar migraciones a la base de datos
```bash
docker compose exec web python manage.py makemigrations
docker compose exec web python manage.py migrate

```

3. Guardar datos semilla (seeders), que posteriormente se usaran como demostración

```bash
docker compose exec web python manage.py seed
```

## Autor 🖋️

Sergio Mercado Salazar

- [Linkedin](https://www.linkedin.com/in/devsergiom/)
- [Github](https://github.com/mercadosergio)