# Portafolio · Samuel Aguilera Araujo

[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue?logo=github&logoColor=white)](https://samuelaguilera.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Portfolio profesional de **Samuel Aguilera Araujo** — Ingeniería Industrial con enfoque en Optimización de Procesos, Mejora Continua y Transformación Digital. Construido como una SPA moderna con animaciones inmersivas y una estética inspirada en ingeniería industrial.

🌐 **Sitio en vivo:** [samuelaguilera.com]

---

## Stack Tecnológico

| Categoría        | Tecnologías                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| **Framework**    | [React 19](https://react.dev) · [Vite 6](https://vitejs.dev) · TypeScript 5 |
| **Estilos**      | [Tailwind CSS v4](https://tailwindcss.com) · `clsx` · `tailwind-merge`     |
| **Animaciones**  | [Framer Motion](https://www.framer.com/motion) · [GSAP](https://gsap.com)   |
| **Scroll**       | [Lenis](https://lenis.studiofreight.com) · GSAP ScrollTrigger               |
| **UI / Iconos**  | [shadcn/ui](https://ui.shadcn.com) · [Lucide](https://lucide.dev)          |
| **Estado**       | [Zustand](https://github.com/pmndrs/zustand)                                |

---

## Secciones del Portfolio

| Sección       | Descripción                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| **Loader**    | Animación de ADN tipo "double helix" con progreso de carga                  |
| **Hero**      | Presentación con foto, certificaciones y CTAs                               |
| **About**     | Terminal interactiva estilo "query-selector" con efecto máquina de escribir |
| **Skills**    | Grid de 10 habilidades técnicas con indicador de nivel                      |
| **Proyectos** | 4 casos de estudio con efecto tilt-card y badges de metodología             |
| **Contacto**  | Canales de contacto con simulación de conexión animada                      |
| **Footer**    | Footer minimal con estado de disponibilidad                                 |

---

## Empezar

```bash
# Clonar el repositorio
git clone https://github.com/FosforoWork/portafolio.git
cd portafolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Scripts

| Comando           | Descripción                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo (Vite)        |
| `npm run build`   | Type-check + build de producción               |
| `npm run preview` | Previsualiza el build de producción            |
| `npm run lint`    | Ejecuta ESLint                                 |

---

## Build & Deploy

El proyecto genera una SPA estática en la carpeta `dist/`.

```bash
npm run build
npm run preview
```

El despliegue se realiza automáticamente a **GitHub Pages** mediante GitHub Actions al hacer push a la rama `main`.

---

## Estructura del Proyecto

```
src/
├── components/       # Componentes React (15)
├── hooks/            # Custom hooks (3)
├── lib/              # Utilidades (cn)
├── store/            # Estado global (Zustand)
├── globals.css       # Estilos globales + Tailwind
├── App.tsx           # Componente raíz
└── main.tsx          # Entry point Vite
public/
├── images/           # Imágenes de perfil y proyectos
└── favicon / icons   # Iconos del sitio
docs/                 # Documentación de proyectos
```

---

## Autor

**Samuel Aguilera Araujo**  
Ingeniería Industrial · UCB "San Pablo", Bolivia

[![Email](https://img.shields.io/badge/samuelagss1@gmail.com-D14836?logo=gmail&logoColor=white)](mailto:samuelagss1@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samuel-aguilera-962560332/)
[![GitHub](https://img.shields.io/badge/FosforoWork-181717?logo=github&logoColor=white)](https://github.com/FosforoWork)
