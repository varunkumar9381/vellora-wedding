# Wedding Showcase — Full React + Django

A complete wedding-products showcase website using:
- React + Vite frontend
- Django + Django REST Framework backend
- SQLite database
- Django Admin for product/category management
- HTML/JSX + CSS + JavaScript
- Product image uploads
- Search and category filtering
- Product details
- Contact form
- No cart, checkout, payment, or customer accounts

## Requirements
- Python 3.11+
- Node.js 18+

## Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend:
http://127.0.0.1:8000/

Admin:
http://127.0.0.1:8000/admin/

Optional sample data:
```bash
python manage.py seed_products
```

## Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173/

The frontend is configured to use:
http://127.0.0.1:8000/api/

## Add products

1. Start Django.
2. Open `/admin/`.
3. Login with your superuser.
4. Add Categories.
5. Add Products and upload images.
6. Refresh the React website.

Products are public and are for display/inquiry only.

## Project structure

```text
wedding_react_django_full/
├── backend/
│   ├── manage.py
│   ├── config/
│   ├── products/
│   ├── media/
│   └── requirements.txt
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── components/
        ├── pages/
        ├── api.js
        ├── App.jsx
        ├── main.jsx
        └── styles.css
```


## One-server mode

From the project folder, double-click `start_one_server.bat`.

Or run:

```bat
cd frontend
npm install
npm run build
cd ..
py scripts\build_react_for_django.py
cd backend
py manage.py migrate
py manage.py runserver
```

Then open `http://127.0.0.1:8000/`.
Admin is at `http://127.0.0.1:8000/admin/`.
