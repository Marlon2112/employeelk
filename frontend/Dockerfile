# Используем базовый образ для Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
COPY package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Указываем порт контейнера
EXPOSE 80

# Запуск сервера (напр. serve)
CMD ["npx", "serve", "-s", "build", "-l", "80"]

