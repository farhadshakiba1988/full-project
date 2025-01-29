# Backend Dockerfile
FROM python:3.9

WORKDIR /app/backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY .. .

# Run migrations and start server
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000