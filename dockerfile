# Gunakan image Node.js sebagai base
FROM node:16-alpine

# Set direktori kerja


# Salin semua file ke direktori kerja
COPY . .

# Pindah ke folder be dan install dependencies
WORKDIR /be
RUN npm install

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "app.js"]
