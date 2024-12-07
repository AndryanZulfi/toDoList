# Gunakan image Node.js
FROM node:16-alpine

# Tentukan working directory
WORKDIR /app

# Pindah ke folder backend
COPY backend/package.json backend/package-lock.json ./backend/

# Salin semua file ke working directory
COPY ./backend ./backend

# Masuk ke folder backend dan install dependencies
WORKDIR /app/backend
RUN npm install

# Tentukan port
ENV PORT=3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
