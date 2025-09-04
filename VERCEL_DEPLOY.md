# 🚀 Деплой на Vercel

## 📋 Подготовка

Все файлы уже готовы для деплоя на Vercel:
- ✅ `vercel.json` - конфигурация
- ✅ `api/handshake.js` - API endpoint для генерации thtk  
- ✅ `api/health.js` - проверка здоровья
- ✅ `package.json` - обновлен для Vercel

## 🌐 Деплой на Vercel

### Вариант 1: Через GitHub (рекомендуется)

1. **Создайте репозиторий на GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tranzilla server"
   git branch -M main
   git remote add origin https://github.com/ваш-юзернейм/tranzilla-server.git
   git push -u origin main
   ```

2. **Подключите к Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "New Project"
   - Выберите ваш GitHub репозиторий
   - Нажмите "Deploy"

### Вариант 2: Через Vercel CLI

1. **Установите Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Логин и деплой:**
   ```bash
   vercel login
   vercel --prod
   ```

## 🔗 После деплоя

Ваши endpoints будут доступны по адресам:

### 🎯 Основной endpoint:
```
POST https://ваш-домен.vercel.app/api/handshake
```

### 💚 Проверка здоровья:
```
GET https://ваш-домен.vercel.app/api/health
```

## 📝 Обновление фронтенда

После деплоя обновите ваш Webflow код:

```javascript
const TRANZILA = {
    terminal: 'myloai',
    currency: '2',
    lang: 'eng',
    handshakeEndpoint: 'https://ваш-домен.vercel.app/api/handshake', // 👈 Новый URL
};
```

## 🧪 Тестирование в Postman

После деплоя протестируйте новый URL:

```bash
curl -X POST https://ваш-домен.vercel.app/api/handshake \
  -H "Content-Type: application/json" \
  -d '{
    "sum": "100.00",
    "currency": "2",
    "orderid": "MYLO-1703123456789"
  }'
```

## 🎉 Готово!

Ваш сервер теперь работает в облаке и доступен из любой точки мира!
