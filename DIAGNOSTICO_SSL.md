# Diagnóstico del Error SSL

## Problema
`ERR_SSL_PROTOCOL_ERROR` al acceder a `https://argentatreuhand.travix.app`

## Verificaciones Necesarias en Coolify

### 1. Verificar Estado del Contenedor
- Ve a **Logs** del deployment
- Verifica que el contenedor esté en estado "Running"
- Busca mensajes como "Server running" o "Listening on port 4321"
- Si no ves estos mensajes, el servidor no está iniciando correctamente

### 2. Verificar Variables de Entorno
En la configuración del deployment, verifica que estas variables estén configuradas:
- `PORT=4321`
- `HOST=0.0.0.0` o `HOSTNAME=0.0.0.0`
- `NODE_ENV=production`

### 3. Verificar Network Configuration
- **Ports Exposes:** Debe ser `4321`
- **Ports Mappings:** Debe estar vacío o ser `4321:4321`

### 4. Verificar Container Labels (SIN DUPLICADOS)
Solo estas 14 labels de Traefik (sin Caddy, sin duplicados):

```
traefik.enable=true
traefik.http.middlewares.gzip.compress=true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.routers.http-0-v4wwsg8w8ocww4s0w8c4k0g8.entryPoints=http
traefik.http.routers.http-0-v4wwsg8w8ocww4s0w8c4k0g8.middlewares=redirect-to-https
traefik.http.routers.http-0-v4wwsg8w8ocww4s0w8c4k0g8.rule=Host(`argentatreuhand.travix.app`) && PathPrefix(`/`)
traefik.http.routers.http-0-v4wwsg8w8ocww4s0w8c4k0g8.service=http-0-v4wwsg8w8ocww4s0w8c4k0g8
traefik.http.routers.https-0-v4wwsg8w8ocww4s0w8c4k0g8.entryPoints=https
traefik.http.routers.https-0-v4wwsg8w8ocww4s0w8c4k0g8.middlewares=gzip
traefik.http.routers.https-0-v4wwsg8w8ocww4s0w8c4k0g8.rule=Host(`argentatreuhand.travix.app`) && PathPrefix(`/`)
traefik.http.routers.https-0-v4wwsg8w8ocww4s0w8c4k0g8.service=https-0-v4wwsg8w8ocww4s0w8c4k0g8
traefik.http.routers.https-0-v4wwsg8w8ocww4s0w8c4k0g8.tls.certresolver=letsencrypt
traefik.http.routers.https-0-v4wwsg8w8ocww4s0w8c4k0g8.tls=true
traefik.http.services.http-0-v4wwsg8w8ocww4s0w8c4k0g8.loadbalancer.server.port=4321
traefik.http.services.https-0-v4wwsg8w8ocww4s0w8c4k0g8.loadbalancer.server.port=4321
```

### 5. Verificar Certificado SSL
1. Ve a la configuración del dominio en Coolify
2. Busca la sección de SSL/Certificates
3. Verifica que el certificado esté generado y activo
4. Si no está generado:
   - Haz clic en "Generate SSL Certificate" o "Enable SSL"
   - Espera 2-5 minutos
   - Verifica los logs de Traefik para ver si hay errores

### 6. Probar HTTP Primero
Antes de probar HTTPS, prueba HTTP:
```
http://argentatreuhand.travix.app
```

- Si HTTP funciona: El problema es solo SSL
- Si HTTP no funciona: El problema es más profundo (servidor no escucha, Traefik no conecta, etc.)

### 7. Verificar Logs de Traefik
En Coolify, busca los logs del servicio Traefik/proxy:
- Busca errores relacionados con certificados
- Busca errores de conexión al servicio
- Busca mensajes sobre "cert resolver doesn't exist"

### 8. Reiniciar Servicios
Si nada funciona:
1. Reinicia el deployment
2. Reinicia el proxy de Traefik (desde el servidor: `docker restart coolify-proxy`)
3. Espera 2-3 minutos y prueba de nuevo

## Posibles Causas

1. **Certificado no generado** → Genera el certificado SSL
2. **Traefik no puede conectar** → Verifica las labels del puerto 4321
3. **Servidor no escucha** → Verifica los logs del contenedor
4. **Conflicto Traefik/Caddy** → Elimina todas las labels de Caddy
5. **Puerto incorrecto** → Verifica que sea 4321 en todas partes

## Comandos de Diagnóstico (desde el servidor)

```bash
# Verificar que el contenedor esté corriendo
docker ps | grep argentatreuhand

# Ver logs del contenedor
docker logs [container-id]

# Verificar que el puerto esté escuchando dentro del contenedor
docker exec [container-id] netstat -tlnp | grep 4321

# Ver logs de Traefik
docker logs coolify-proxy
```

## Solución Temporal

Si necesitas que funcione urgentemente, puedes:
1. Deshabilitar temporalmente la redirección HTTPS
2. Acceder solo por HTTP hasta resolver el SSL
3. O usar un certificado SSL manual si Coolify no lo genera



