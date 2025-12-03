# Cal.com Configuración - Argenta Treuhand

## 🎉 ¡Refactoring Completado!

El sistema de reservas ha sido migrado exitosamente de un calendario personalizado a **Cal.com**.

## 📦 Cambios Realizados

### ✅ Componentes Actualizados
- ✨ **Nuevo**: `src/components/CalComBooking.tsx` - Componente simple y mantenible usando Cal.com
- 🗑️ **Eliminado**: `src/components/BookingCalendar.tsx` - 754 líneas de código personalizado reemplazadas

### 📄 Páginas Actualizadas
- `src/pages/reservar.astro` - Página de reservas en español
- `src/pages/de/reservar.astro` - Página de reservas en alemán

### 📦 Dependencias Instaladas
- `@calcom/embed-react` - Librería oficial de Cal.com para React

## 🔧 Configuración Requerida

### 1. Configurar Variable de Entorno

Edita tu archivo `.env` y agrega la siguiente variable:

```bash
PUBLIC_CALCOM_LINK=tu-usuario-calcom/tu-evento
```

**Ejemplo:**
```bash
PUBLIC_CALCOM_LINK=usuario-de-tu-amiga/consulta-30min
```

### 2. Configurar tu Cuenta de Cal.com

1. Crea o inicia sesión en tu cuenta de [Cal.com](https://cal.com)
2. Crea un tipo de evento (por ejemplo: "Consulta 30min")
3. Copia el enlace del evento, que tiene el formato: `tu-usuario/nombre-evento`
4. Pega ese valor en la variable `PUBLIC_CALCOM_LINK` en tu archivo `.env`

### 3. Personalización Opcional

Puedes personalizar el calendario editando `src/components/CalComBooking.tsx`:

```typescript
cal("ui", {
  theme: "light", // o "dark", "auto"
  styles: { branding: { brandColor: "#2563eb" } }, // Cambia el color
  hideEventTypeDetails: false,
  layout: "month_view" // o "week_view", "column_view"
});
```

## 🚀 Despliegue en Coolify

Asegúrate de agregar la variable de entorno en tu configuración de Coolify:

```
PUBLIC_CALCOM_LINK=tu-usuario-calcom/tu-evento
```

## ✨ Ventajas del Nuevo Sistema

- **Menos código**: De 754 líneas a ~50 líneas
- **Mantenimiento**: Cal.com maneja actualizaciones, sincronización y notificaciones
- **Características**: Zoom/Google Meet integrado, múltiples calendarios, pagos, etc.
- **Profesional**: Interface moderna y confiable
- **Sin backend**: No necesitas mantener lógica de reservas en el servidor

## 📱 Testing

Para probar el nuevo sistema:

1. Ejecuta `npm run dev`
2. Visita `http://localhost:4321/reservar` (español) o `/de/reservar` (alemán)
3. Verifica que el calendario de Cal.com se cargue correctamente

## 🆘 Soporte

Si tienes problemas:
- Verifica que la variable `PUBLIC_CALCOM_LINK` esté configurada correctamente
- Asegúrate de que el evento en Cal.com esté público y activo
- Revisa la consola del navegador para errores de JavaScript

---

**Documentación oficial**: https://cal.com/docs/introduction

