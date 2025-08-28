<img width="1915" height="879" alt="image" src="https://github.com/user-attachments/assets/665aa6e5-e1a7-410e-b1da-c97615c44b6c" />
<img width="1902" height="949" alt="image" src="https://github.com/user-attachments/assets/699dc8af-a5a9-48d2-a232-b7a52ce1939b" />

# Postify - Quick Start

A minimalist social feed: React + Vite frontend, Laravel Sanctum API backend.

## Prerequisites

- PHP 8.2+ and Composer
- Node.js 18+ and npm

## Backend (Laravel API)

```bash
cd api-sanctum
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --force
php artisan serve
```

API: http://127.0.0.1:8000

## Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

App: http://localhost:5173

## Notes

- Frontend calls API at http://127.0.0.1:8000/api
- Register/login via UI; auth uses Laravel Sanctum (Bearer tokens)
