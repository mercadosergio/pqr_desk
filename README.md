# PQR Desk

## Descripción

## Requisitos

- Python 3.9+ (path configurado en las variables de entorno, [seguir enlace]())
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

7. Ejecutar aplicación ``ng serve`


## Autor 🖋️

Sergio Mercado Salazar

- [Linkedin](https://www.linkedin.com/in/devsergiom/)
- [Github](https://github.com/mercadosergio)