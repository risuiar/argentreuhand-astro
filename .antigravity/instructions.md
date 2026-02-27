# Reglas de Desarrollo - Proyecto Astro

1. **Estructura de Componentes**: Usa siempre el bloque de 'frontmatter' (---) para la lógica y TypeScript.
2. **Estilos**: Prioriza Tailwind CSS (si lo usas) o estilos "scoped" dentro del archivo .astro.
3. **Islas de Interactividad**: Si un componente necesita JS en el cliente, usa la directiva `client:load` o `client:visible` de forma justificada.
4. **Optimización**: Todas las imágenes deben usar el componente <Image /> nativo de Astro.
5. **Tipado**: Prohibido usar 'any'. Define interfaces para las 'Props' de cada componente.
6. **Traducciones**: Utiliza el componente <Translation /> para traducir textos.
