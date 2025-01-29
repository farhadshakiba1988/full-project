# Frontend Dockerfile
FROM node:16

WORKDIR /app/frontend

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Build for production
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

# Start the app
CMD serve -s build -l 3000upstream backend {
    server backend:8000;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name localhost;

    location /api/ {
        proxy_pass http://backend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location / {
        proxy_pass http://frontend;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location /static/ {
        alias /app/backend/static/;
    }

    location /media/ {
        alias /app/backend/media/;
    }
}