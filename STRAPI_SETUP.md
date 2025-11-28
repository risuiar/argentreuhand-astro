# Strapi Integration Setup

Este proyecto incluye componentes reutilizables para integrar contenido de Strapi CMS con diferentes comportamientos para desarrollo y producción.

## 🚀 Características

- **Desarrollo**: Contenido en tiempo real sin caché
- **Producción**: Contenido estático con caché de 1 hora
- **Multilingüe**: Soporte para español y alemán
- **Reutilizable**: Componentes flexibles para diferentes tipos de contenido
- **Tipado**: TypeScript completo con interfaces definidas

## 📦 Componentes Creados

### 1. `StrapiContent` - Contenido Individual

Para mostrar contenido específico por slug o ID.

### 2. `StrapiList` - Lista de Contenido

Para mostrar listas de contenido con paginación opcional.

### 3. `useStrapi` - Hook Personalizado

Hook para manejar llamadas a la API de Strapi.

### 4. `useStrapiList` - Hook para Listas

Hook para manejar listas de contenido con paginación.

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Strapi Configuration
PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token_here
```

### Para Producción

```env
PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_TOKEN=your_production_api_token
```

## 📝 Uso de los Componentes

### 1. Contenido Individual

```tsx
import StrapiContent from '../components/StrapiContent';

// Por slug
<StrapiContent
  contentType="blog"
  slug="mi-articulo"
  locale="es"
  client:load
/>

// Por ID
<StrapiContent
  contentType="page"
  id="123"
  locale="de"
  client:load
/>

// Con renderizado personalizado
<StrapiContent
  contentType="service"
  slug="consultoria-fiscal"
  renderContent={(data) => (
    <div className="custom-layout">
      <h1>{data.attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.attributes.content }} />
    </div>
  )}
  client:load
/>
```

### 2. Lista de Contenido

```tsx
import StrapiList from '../components/StrapiList';

// Lista básica de blogs
<StrapiList
  contentType="blog"
  locale="es"
  limit={6}
  client:load
/>

// Con paginación
<StrapiList
  contentType="blog"
  locale="es"
  limit={10}
  showPagination={true}
  client:load
/>

// Con filtros
<StrapiList
  contentType="testimonial"
  locale="es"
  filters={{ featured: true }}
  sort="publishedAt:desc"
  client:load
/>

// Con renderizado personalizado
<StrapiList
  contentType="service"
  locale="es"
  renderItem={(item, index) => (
    <div key={item.id} className="custom-card">
      <h3>{item.attributes.title}</h3>
      <p>{item.attributes.excerpt}</p>
    </div>
  )}
  client:load
/>
```

### 3. Usando los Hooks Directamente

```tsx
import { useStrapi, useStrapiList } from "../hooks/useStrapi";

function MyComponent() {
  // Contenido individual
  const { data, loading, error } = useStrapi({
    contentType: "blog",
    slug: "mi-articulo",
    locale: "es",
  });

  // Lista de contenido
  const {
    data: posts,
    loading,
    error,
    pagination,
  } = useStrapiList({
    contentType: "blog",
    locale: "es",
    limit: 5,
    sort: "publishedAt:desc",
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Renderizar contenido */}</div>;
}
```

## 🎨 Tipos de Contenido Soportados

- **`page`**: Páginas estáticas
- **`blog`**: Artículos de blog
- **`service`**: Servicios
- **`testimonial`**: Testimonios
- **`faq`**: Preguntas frecuentes

## 🔄 Comportamiento por Entorno

### Desarrollo (`npm run dev`)

- Sin caché (`cache: 'no-store'`)
- Contenido en tiempo real
- Actualizaciones inmediatas desde Strapi

### Producción (`npm run build`)

- Con caché (`cache: 'force-cache'`)
- Revalidación cada 1 hora
- Contenido estático para mejor rendimiento

## 📱 Ejemplos de Uso

### Página de Blog Individual

```tsx
// pages/blog/[slug].astro
---
import StrapiContent from '../../components/StrapiContent';
import { getLangFromUrl } from '../../lib/i18n';

const { slug } = Astro.params;
const lang = getLangFromUrl(Astro.url);
---

<StrapiContent
  contentType="blog"
  slug={slug}
  locale={lang}
  client:load
/>
```

### Sección de Testimonios en Home

```tsx
// En cualquier componente
<StrapiList
  contentType="testimonial"
  locale={lang}
  limit={3}
  filters={{ featured: true }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
  client:load
/>
```

### Contenido Dinámico en Servicios

```tsx
<StrapiContent
  contentType="service"
  slug="consultoria-fiscal"
  locale={lang}
  renderContent={(data) => (
    <div className="service-card">
      <h2>{data.attributes.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: data.attributes.content }} />
      <div className="features">
        {data.attributes.features?.map((feature, index) => (
          <div key={index} className="feature-item">
            {feature}
          </div>
        ))}
      </div>
    </div>
  )}
  client:load
/>
```

## 🛠️ Configuración de Strapi

### Estructura de Contenido Recomendada

```json
{
  "contentTypes": {
    "blog": {
      "title": "string",
      "content": "richtext",
      "excerpt": "text",
      "slug": "uid",
      "featured": "boolean",
      "publishedAt": "datetime"
    },
    "service": {
      "title": "string",
      "content": "richtext",
      "slug": "uid",
      "icon": "string",
      "features": "json"
    },
    "testimonial": {
      "content": "richtext",
      "author": "string",
      "company": "string",
      "rating": "integer",
      "featured": "boolean"
    }
  }
}
```

### Configuración de Internacionalización

En Strapi, configura los locales:

- `es` (Español)
- `de` (Alemán)

## 🔍 Debugging

### Verificar Conexión

```tsx
// En cualquier componente
console.log("Strapi URL:", import.meta.env.PUBLIC_STRAPI_URL);
console.log("Is Dev:", import.meta.env.DEV);
```

### Logs de Error

Los errores se muestran automáticamente en los componentes con:

- Mensaje de error
- Fallback opcional
- Estado de carga

## 📈 Optimización

### Caché y Rendimiento

- **Desarrollo**: Sin caché para desarrollo rápido
- **Producción**: Caché de 1 hora para mejor rendimiento
- **Revalidación**: Automática en producción

### SEO

Los componentes renderizan contenido estático en producción, lo que es ideal para SEO.

## 🚨 Troubleshooting

### Error de Conexión

1. Verifica `PUBLIC_STRAPI_URL` en `.env`
2. Asegúrate de que Strapi esté ejecutándose
3. Verifica el token de API

### Contenido No Carga

1. Verifica que el contenido esté publicado en Strapi
2. Verifica el locale correcto
3. Verifica el slug o ID

### Errores de TypeScript

1. Verifica que los tipos coincidan con tu estructura de Strapi
2. Actualiza las interfaces si es necesario

## 📚 Recursos Adicionales

- [Documentación de Strapi](https://docs.strapi.io/)
- [Astro Documentation](https://docs.astro.build/)
- [React Hooks](https://react.dev/reference/react/hooks)
