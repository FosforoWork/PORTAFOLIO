<p align="center">
  <img src="public/images/Banner Industrial Samuel.png" alt="Samuel Aguilera Araujo - Portafolio" width="100%" style="border-radius: 8px;">
</p>

<h1 align="center">💼 Portafolio Profesional · Samuel Aguilera Araujo</h1>

<p align="center">
  <strong>Ingeniería Industrial | Optimización de Procesos | Data & Automatización</strong>
</p>

<p align="center">
  <a href="https://samuelaguilera.com">
    <img src="https://img.shields.io/badge/Sitio%20en%20Vivo-samuelaguilera.com-orange?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Sitio Web">
  </a>
</p>

<p align="center">
  <a href="#-resumen-del-proyecto">Resumen</a> •
  <a href="#-stack-tecnológico">Stack Tecnológico</a> •
  <a href="#-estructura-de-secciones">Secciones</a> •
  <a href="#-guía-de-inicio-rápido">Empezar</a> •
  <a href="#-estructura-del-proyecto">Estructura</a> •
  <a href="#-autor">Autor</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-11.0-FF00FE?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion">
</p>

---

## 🌟 Resumen del Proyecto

Este repositorio contiene el código fuente de mi portafolio profesional interactivo. Ha sido diseñado bajo una **estética de ingeniería industrial y automatización (satinados oscuros y acentos naranja de seguridad)**. Cuenta con una navegación fluida controlada por scroll, animaciones interactivas de partículas en 3D y Canvas, y un enfoque en optimización de rendimiento móvil y de escritorio.

## 🎯 Pilares del Portafolio

*   ⚡ **Optimización y Mejora Continua**: Diseñado con mentalidad Lean Six Sigma aplicada a la arquitectura del software.
*   📊 **Decisiones Respaldadas por Datos**: Visualización limpia, rápida y estructurada de KPIs y métricas de proyectos.
*   🤖 **Automatización Visual**: Animaciones de scroll fluidas e interactivas que simulan procesos industriales y flujos lógicos.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnologías | Descripción / Uso |
| :--- | :--- | :--- |
| **Core** | `React 19` • `Vite 6` • `TypeScript 5` | Estructura modular, tipado estricto y compilación instantánea. |
| **Estilos** | `Tailwind CSS v4` • `clsx` • `tailwind-merge` | Diseño responsive optimizado con variables CSS nativas y utilidades dinámicas. |
| **Animaciones** | `Framer Motion` • `GSAP` | Interpolación física de scroll, efectos de entrada y comportamiento inmersivo. |
| **Scroll** | `Lenis Scroll` • `GSAP ScrollTrigger` | Desplazamiento ultra suave y control milimétrico del progreso del viewport. |
| **UI / Iconos** | `shadcn/ui` • `Lucide Icons` | Componentes de interfaz accesibles y biblioteca de iconos vectoriales limpia. |
| **Estado** | `Zustand` | Store global ligero y reactivo para coordinar estados complejos. |

---

## 🧭 Estructura de Secciones

El portafolio se divide en un recorrido interactivo de scroll continuo:

*   🧬 **Loader**: Animación de carga tipo doble hélice de ADN con indicador de porcentaje en tiempo real.
*   🚀 **Hero / Presentación**: Introducción visual de alto impacto con foto de perfil, badges dinámicos y enlaces de contacto rápido.
*   🖥️ **About**: Terminal interactiva estilo "query-selector" con efecto de máquina de escribir y detalles académicos/profesionales.
*   📊 **Skills**: Cuadrícula interactiva con las 10 principales habilidades técnicas evaluadas con medidores de progreso dinámicos.
*   📁 **Proyectos**: Casos de estudio industriales con efecto tilt-card (inclinación 3D con mouse) y badges de metodologías aplicadas.
*   📡 **Contacto**: Sección interactiva de canales de contacto con simulación de red conectada y estados de disponibilidad.

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para clonar y ejecutar el portafolio en tu entorno de desarrollo local:

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org) (v18 o superior).

```bash
# 1. Clonar el repositorio
git clone https://github.com/FosforoWork/portafolio.git
cd portafolio

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

El servidor local se iniciará en [http://localhost:5173](http://localhost:5173).

---

## ⚙️ Scripts Disponibles

El proyecto incluye los siguientes comandos preconfigurados en `package.json`:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en modo local con Vite. |
| `npm run build` | Valida tipos (`tsc`) y compila la aplicación para producción en la carpeta `dist/`. |
| `npm run preview` | Previsualiza localmente el build de producción generado. |
| `npm run lint` | Ejecuta ESLint para analizar la calidad y estilo del código. |

---

## 📁 Estructura del Proyecto

```text
src/
├── components/       # Componentes visuales interactivos de React (Navbar, Hero, TiltCard, etc.)
├── hooks/            # Hooks personalizados para scroll y lógica global
├── lib/              # Utilidades comunes (unión de clases con clsx/tailwind-merge)
├── store/            # Gestión de estado global con Zustand
├── globals.css       # Estilos globales y configuración del sistema de diseño (Tailwind)
├── App.tsx           # Componente principal que coordina el flujo
└── main.tsx          # Punto de entrada de la aplicación
public/
├── images/           # Recursos visuales, banners y mockups
└── favicon/          # Iconos y favicons adaptados a diferentes dispositivos
```

---

## ✍️ Autor

Diseñado y desarrollado con pasión por **Samuel Aguilera Araujo**.

<p align="left">
  <a href="mailto:samuelagss1@gmail.com">
    <img src="https://img.shields.io/badge/Email-samuelagss1@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Gmail">
  </a>
  <a href="https://www.linkedin.com/in/samuelaguileraaraujo">
    <img src="https://img.shields.io/badge/LinkedIn-Samuel%20Aguilera-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/FosforoWork">
    <img src="https://img.shields.io/badge/GitHub-FosforoWork-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>
