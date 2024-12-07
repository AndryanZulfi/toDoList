# Gunakan image resmi Node.js
FROM node:16-alpine

# Atur working directory
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Salin seluruh file ke container
COPY . .

# Jalankan aplikasi
CMD ["npm", "start"]
