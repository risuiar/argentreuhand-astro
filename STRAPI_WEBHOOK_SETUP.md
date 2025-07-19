# Configuración de Webhooks en Strapi

## 1. Configuración desde el Panel de Administración

### Paso 1: Acceder a Webhooks

1. Ve a tu panel de administración de Strapi
2. Navega a **Settings** → **Webhooks**
3. Haz clic en **"Add new webhook"**

### Paso 2: Configurar el Webhook

```
Name: Clear Cache
URL: https://tu-dominio.com/api/clear-cache
Method: POST
Events:
  ✅ entry.publish
  ✅ entry.update
  ✅ entry.delete
  ✅ media.create
  ✅ media.update
  ✅ media.delete
```

### Paso 3: Configurar Headers (Opcional)

Si quieres agregar autenticación:

```
Headers:
  Content-Type: application/json
  x-api-key: tu-secret-key-aqui
```

## 2. Configuración por Tipo de Contenido

### Para Home Page (arg-home)

```
Name: Clear Home Cache
URL: https://tu-dominio.com/api/clear-cache
Method: POST
Events: entry.publish, entry.update, entry.delete
Filters: contentTypes = ["arg-home"]
```

### Para Blog Posts

```
Name: Clear Blog Cache
URL: https://tu-dominio.com/api/clear-cache
Method: POST
Events: entry.publish, entry.update, entry.delete
Filters: contentTypes = ["blog-post"]
```

## 3. Configuración Programática

### Crear Plugin Personalizado

1. **Crear el plugin:**

```bash
npx strapi generate
# Seleccionar: plugin
# Nombre: clear-cache-webhook
```

2. **Configurar el plugin:**

```javascript
// src/plugins/clear-cache-webhook/server/index.js
module.exports = ({ strapi }) => ({
  register({ strapi }) {
    // Registrar webhook automáticamente
    strapi.webhookStore.createWebhook({
      name: "Clear Cache",
      url: "https://tu-dominio.com/api/clear-cache",
      method: "POST",
      events: ["entry.publish", "entry.update", "entry.delete"],
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
});
```

## 4. Testing del Webhook

### Probar desde Strapi

1. Ve a **Settings** → **Webhooks**
2. Encuentra tu webhook
3. Haz clic en **"Test"**
4. Selecciona un evento para probar

### Probar Manualmente

```bash
# Probar el endpoint
curl -X POST https://tu-dominio.com/api/clear-cache

# Verificar que funciona
curl https://tu-dominio.com/api/clear-cache
```

## 5. Monitoreo

### Logs en Strapi

Los webhooks aparecen en los logs de Strapi:

```
[Webhook] Sending webhook to https://tu-dominio.com/api/clear-cache
[Webhook] Webhook sent successfully
```

### Logs en tu Aplicación

Tu aplicación mostrará:

```
🔄 Clear cache request received
🧹 Clearing all cache
🗑️ Cleared all home cache
📊 Cache status after clearing: {}
```

## 6. Troubleshooting

### Problemas Comunes

1. **Webhook no se envía:**

   - Verificar que la URL es correcta
   - Verificar que el servidor está funcionando
   - Revisar logs de Strapi

2. **Error 404:**

   - Verificar que la ruta `/api/clear-cache` existe
   - Verificar que el servidor está corriendo

3. **Error de autenticación:**
   - Verificar que los headers están configurados correctamente
   - Verificar que el secret coincide

### Debug

```bash
# Ver logs de Strapi
npm run develop

# Ver logs de tu aplicación
npm run dev
```

## 7. Configuración de Producción

### Variables de Entorno

```env
# En Strapi
WEBHOOK_URL=https://tu-dominio.com/api/clear-cache
WEBHOOK_SECRET=tu-secret-key-aqui

# En tu aplicación
CACHE_SECRET=tu-secret-key-aqui
```

### Configuración de Seguridad

1. Usar HTTPS en producción
2. Implementar autenticación con headers
3. Limitar eventos a los necesarios
4. Monitorear logs regularmente
