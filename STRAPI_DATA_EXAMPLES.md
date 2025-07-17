# Strapi Data Examples

Este archivo contiene ejemplos de la estructura de datos que debes crear en Strapi para cada sección del sitio web.

## 📋 Configuración Inicial en Strapi

### 1. Crear los Content Types

En Strapi, crea los siguientes Content Types:

- `hero`
- `service`
- `why-choose-us`
- `testimonial`
- `footer`

### 2. Configurar Internacionalización

Habilita los locales:

- `es` (Español)
- `de` (Alemán)

## 🎯 Ejemplos de Datos

### 1. Hero Section (es)

```json
{
  "title": "Expertos en Consultoría Fiscal",
  "titleHighlight1": "Fiscal",
  "titleHighlight2": "Empresarial",
  "subtitle": "Ofrecemos servicios integrales de asesoría fiscal y consultoría empresarial para empresas y particulares en Suiza. Nuestro equipo de expertos te acompaña en cada paso.",
  "badge": "Asesoría Profesional",
  "ctaPrimary": "Reservar Consulta",
  "ctaSecondary": "Ver Servicios",
  "stats": {
    "clients": "Clientes Satisfechos",
    "savings": "Ahorros Generados",
    "experience": "Años de Experiencia"
  }
}
```

### 2. Hero Section (de)

```json
{
  "title": "Experten für Steuerberatung",
  "titleHighlight1": "Steuerberatung",
  "titleHighlight2": "Unternehmensberatung",
  "subtitle": "Wir bieten umfassende Steuerberatung und Unternehmensberatung für Unternehmen und Privatpersonen in der Schweiz. Unser Expertenteam begleitet Sie bei jedem Schritt.",
  "badge": "Professionelle Beratung",
  "ctaPrimary": "Beratung buchen",
  "ctaSecondary": "Dienstleistungen ansehen",
  "stats": {
    "clients": "Zufriedene Kunden",
    "savings": "Generierte Einsparungen",
    "experience": "Jahre Erfahrung"
  }
}
```

### 3. Services Section (es)

```json
{
  "title": "Nuestros Servicios",
  "subtitle": "Ofrecemos una amplia gama de servicios fiscales y empresariales para ayudarte a optimizar tu situación fiscal y hacer crecer tu negocio.",
  "cta": "Saber Más",
  "items": {
    "taxes": {
      "title": "Asesoría Fiscal",
      "description": "Optimización fiscal, declaración de impuestos, planificación fiscal estratégica para empresas y particulares.",
      "features": [
        "Declaración de impuestos",
        "Optimización fiscal",
        "Planificación fiscal estratégica",
        "Asesoría en impuestos internacionales"
      ],
      "icon": "Calculator",
      "color": "bg-blue-50 text-blue-600"
    },
    "company": {
      "title": "Consultoría Empresarial",
      "description": "Asesoramiento integral para la creación, gestión y optimización de empresas en Suiza.",
      "features": [
        "Constitución de empresas",
        "Gestión empresarial",
        "Optimización de procesos",
        "Asesoría legal empresarial"
      ],
      "icon": "Building",
      "color": "bg-emerald-50 text-emerald-600"
    },
    "planning": {
      "title": "Planificación Financiera",
      "description": "Estrategias de planificación financiera personalizada para maximizar tu patrimonio.",
      "features": [
        "Planificación patrimonial",
        "Inversiones estratégicas",
        "Gestión de riesgos",
        "Planificación de jubilación"
      ],
      "icon": "TrendingUp",
      "color": "bg-purple-50 text-purple-600"
    },
    "accounting": {
      "title": "Contabilidad",
      "description": "Servicios de contabilidad completa y gestión financiera para empresas de todos los tamaños.",
      "features": [
        "Contabilidad completa",
        "Balances mensuales",
        "Análisis financiero",
        "Reporting empresarial"
      ],
      "icon": "FileText",
      "color": "bg-yellow-50 text-yellow-600"
    },
    "consulting": {
      "title": "Consultoría Financiera",
      "description": "Asesoramiento financiero especializado para optimizar la rentabilidad de tu empresa.",
      "features": [
        "Análisis financiero",
        "Optimización de costes",
        "Estrategias de crecimiento",
        "Financiación empresarial"
      ],
      "icon": "PiggyBank",
      "color": "bg-rose-50 text-rose-600"
    },
    "defense": {
      "title": "Defensa Fiscal",
      "description": "Representación y defensa en procedimientos fiscales y administrativos.",
      "features": [
        "Defensa en inspecciones",
        "Recursos administrativos",
        "Negociación con autoridades",
        "Asesoría legal fiscal"
      ],
      "icon": "Scale",
      "color": "bg-indigo-50 text-indigo-600"
    }
  }
}
```

### 4. Why Choose Us Section (es)

```json
{
  "title": "¿Por Qué Elegirnos?",
  "subtitle": "Nuestra experiencia, profesionalidad y compromiso nos distinguen como tu socio de confianza en asesoría fiscal y empresarial.",
  "reasons": {
    "experience": {
      "title": "15+ Años de Experiencia",
      "description": "Más de 15 años de experiencia en el sector fiscal y empresarial suizo.",
      "icon": "Award",
      "color": "bg-blue-50 text-blue-600"
    },
    "response": {
      "title": "Respuesta Rápida",
      "description": "Respuesta garantizada en menos de 24 horas para todas tus consultas.",
      "icon": "Clock",
      "color": "bg-emerald-50 text-emerald-600"
    },
    "personal": {
      "title": "Atención Personalizada",
      "description": "Cada cliente tiene un asesor dedicado que conoce su caso en detalle.",
      "icon": "Users",
      "color": "bg-purple-50 text-purple-600"
    },
    "technology": {
      "title": "Tecnología Avanzada",
      "description": "Utilizamos las últimas tecnologías para optimizar nuestros servicios.",
      "icon": "Zap",
      "color": "bg-yellow-50 text-yellow-600"
    },
    "security": {
      "title": "Máxima Seguridad",
      "description": "Tus datos están protegidos con los más altos estándares de seguridad.",
      "icon": "Shield",
      "color": "bg-rose-50 text-rose-600"
    },
    "commitment": {
      "title": "Compromiso Total",
      "description": "Nos comprometemos a conseguir los mejores resultados para nuestros clientes.",
      "icon": "HeartHandshake",
      "color": "bg-indigo-50 text-indigo-600"
    }
  },
  "stats": {
    "clients": "Clientes Satisfechos",
    "satisfaction": "Satisfacción del Cliente",
    "savings": "Ahorros Generados",
    "response": "Tiempo de Respuesta"
  }
}
```

### 5. Testimonials Section (es)

```json
{
  "title": "Lo Que Dicen Nuestros Clientes",
  "subtitle": "Descubre por qué cientos de empresas y particulares confían en nosotros para sus necesidades fiscales y empresariales.",
  "items": [
    {
      "name": "María González",
      "role": "CEO",
      "company": "TechStart AG",
      "content": "Argenta Treuhand ha sido fundamental para el crecimiento de nuestra empresa. Su asesoría fiscal nos ha permitido optimizar nuestros costes y enfocarnos en el desarrollo del negocio.",
      "rating": 5
    },
    {
      "name": "Carlos Müller",
      "role": "Director Financiero",
      "company": "Swiss Manufacturing",
      "content": "Excelente servicio profesional. El equipo de Argenta Treuhand es muy competente y siempre está disponible para resolver nuestras dudas. Altamente recomendado.",
      "rating": 5
    },
    {
      "name": "Ana Schmidt",
      "role": "Emprendedora",
      "company": "Boutique Consulting",
      "content": "Gracias a Argenta Treuhand pude establecer mi empresa en Suiza sin problemas. Su asesoría fue invaluable durante todo el proceso. Muy satisfecha con el servicio.",
      "rating": 5
    }
  ]
}
```

### 6. Footer Section (es)

```json
{
  "description": "Argenta Treuhand es tu socio de confianza para todos los aspectos fiscales y empresariales en Suiza. Ofrecemos servicios profesionales y personalizados para empresas y particulares.",
  "services": {
    "title": "Servicios",
    "items": [
      "Asesoría Fiscal",
      "Consultoría Empresarial",
      "Planificación Financiera",
      "Contabilidad",
      "Consultoría Financiera",
      "Defensa Fiscal"
    ]
  },
  "quickLinks": {
    "title": "Enlaces Rápidos",
    "items": [
      {
        "label": "Inicio",
        "href": "/"
      },
      {
        "label": "Servicios",
        "href": "/#servicios"
      },
      {
        "label": "Sobre Nosotros",
        "href": "/#sobre-nosotros"
      },
      {
        "label": "Contacto",
        "href": "/#contacto"
      },
      {
        "label": "Blog",
        "href": "/blog"
      }
    ]
  },
  "contact": {
    "title": "Contacto"
  },
  "legal": {
    "copyright": "© 2024 Argenta Treuhand. Todos los derechos reservados.",
    "privacy": "Política de Privacidad",
    "terms": "Términos y Condiciones",
    "cookies": "Política de Cookies"
  }
}
```

## 🔧 Configuración en Strapi

### 1. Estructura de Campos

Para cada Content Type, configura los siguientes tipos de campos:

#### Hero

- `title` (Text)
- `titleHighlight1` (Text)
- `titleHighlight2` (Text)
- `subtitle` (Long Text)
- `badge` (Text)
- `ctaPrimary` (Text)
- `ctaSecondary` (Text)
- `stats` (JSON)

#### Service

- `title` (Text)
- `subtitle` (Long Text)
- `cta` (Text)
- `items` (JSON)

#### Why Choose Us

- `title` (Text)
- `subtitle` (Long Text)
- `reasons` (JSON)
- `stats` (JSON)

#### Testimonial

- `title` (Text)
- `subtitle` (Long Text)
- `items` (JSON)

#### Footer

- `description` (Long Text)
- `services` (JSON)
- `quickLinks` (JSON)
- `contact` (JSON)
- `legal` (JSON)

### 2. Configuración de Permisos

1. Ve a Settings > Users & Permissions Plugin > Roles
2. Selecciona "Public"
3. Habilita los permisos de lectura para todos los Content Types
4. Guarda los cambios

### 3. Configuración de API

1. Ve a Settings > API Tokens
2. Crea un nuevo token con permisos de lectura
3. Copia el token y añádelo a tu archivo `.env`

## 🚀 Uso en el Código

Una vez configurado Strapi, puedes usar los componentes así:

```tsx
// En tu página index.astro
<StrapiHero lang={lang} client:load />
<StrapiServices lang={lang} client:load />
<StrapiWhyChooseUs lang={lang} client:load />
<StrapiTestimonials lang={lang} client:load />
<StrapiFooter lang={lang} client:load />
```

## 📝 Notas Importantes

1. **Publicar el contenido**: Asegúrate de publicar el contenido en Strapi para que sea accesible via API
2. **Configurar locales**: Crea el contenido en ambos idiomas (es y de)
3. **Validar JSON**: Verifica que la estructura JSON sea válida antes de guardar
4. **Backup**: Haz copias de seguridad de tu contenido en Strapi

## 🔍 Testing

Para probar que todo funciona:

1. Ejecuta `npm run dev`
2. Verifica que los componentes cargan correctamente
3. Cambia el idioma y verifica que el contenido cambia
4. Revisa la consola del navegador para posibles errores
