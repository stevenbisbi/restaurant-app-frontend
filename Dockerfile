# frontend/Dockerfile
FROM node:20-alpine

# Establece variables de entorno explícitamente
ENV NODE_ENV=development
ENV HOST=0.0.0.0

WORKDIR /app

# Copiamos solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto por defecto de Vite
EXPOSE 5173

# Comando para ejecutar el servidor de desarrollo de Vite
CMD ["npm", "run", "dev"]
