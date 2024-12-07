# Gunakan image Node.js
FROM node:16-alpine

# Tentukan working directory
WORKDIR /app

# Salin file package.json ke container
COPY package.json .

# Salin file package-lock.json jika ada
COPY package-lock.json .

# Install dependencies
RUN npm install

# Salin seluruh file proyek ke container
COPY . .

# Tentukan port aplikasi
ENV PORT 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
