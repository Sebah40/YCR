# Yankee Chihuahua Rescue & Adoption

Sitio web de **Yankee Chihuahua Rescue and Adoption, Inc. (YCRAA)**, organización sin fines de lucro 501(c)(3) fundada en el año 2000 y basada en Nueva Inglaterra, dedicada al rescate y reubicación de chihuahuas y mezclas.

Despliegue: https://yankeechihuahuarescue.vercel.app

## Stack

- **Next.js 16** (App Router) + React 19
- **TypeScript**
- **Tailwind CSS v4**
- **Upstash Redis** para almacenamiento ligero (envíos de formularios, rate limiting)
- `lucide-react` para iconografía
- Desplegado en **Vercel**

## Funcionalidades

- Sistema multi-tema (incluye temas estacionales como St. Patrick's Day)
- Panel de administración
- Formularios de adopción, voluntariado y donaciones
- Imágenes temáticas y animaciones sutiles

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # credenciales de Upstash Redis
npm run dev
```

Abrir http://localhost:3000.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |

## Autor

Sebastián Haoys — desarrollado para YCRAA
