# Agent Loop: Portafolio Web estilo RPG

> Spec lista para alimentar un `/goal` de Claude Code (o cualquier harness agéntico). Incluye stack, mapeo de diseño, ciclo de iteración y criterios de verificación.

---

## 1. Objetivo en una frase

Convierte el siguiente portafolio WEB (hero / about / skills / proyectos / contacto) en una **experiencia navegable estilo RPG**, sin sacrificar performance, accesibilidad ni SEO — usando librerías UI modernas y bien establecidas, no hacks frágiles.

---

## 2. Stack tecnológico

### Capa base (obligatoria)
| Capa | Librería | Por qué |
|---|---|---|
| Framework | **Vite + React 19** | SSR/SEO si es portfolio público; Vite si es SPA pura |
| Lenguaje | **TypeScript** | Tipado de "estado de personaje" (XP, quests, inventario) |
| Estilos | **Tailwind CSS v4** | Tokens de diseño rápidos (paleta retro, spacing tipo grid de 8px/16px) |
| Componentes base | **shadcn/ui** (sobre Radix UI) | Primitivos accesibles (dialog, tabs, tooltip) que luego "re-skineas" como UI de juego — no reinventas focus-trap ni aria |
| Animación UI | **Motion** (ex-Framer Motion) | Transiciones entre "pantallas" del juego, hover de cards |
| Animación scroll/cinemática | **GSAP + ScrollTrigger** | Secuencias de scroll (stats que se llenan, quests que se revelan) |
| Scroll suave | **Lenis** | Sensación de "explorar el mapa" en vez de scroll nativo brusco |
| Estado global | **Zustand** | "Estado del personaje": XP, quests completadas, sonido on/off, tema |
| Iconos | **lucide-react** | Set moderno, tree-shakeable |
| Tipografía | `Pixelify Sans` o `Press Start 2P` (headers) + una sans legible (body) | Pixel font SOLO en títulos/HUD — nunca en párrafos largos (rompe legibilidad y a11y) |

> Asegurate de emplear las skills que se encuentran en: .agents\skills

### Verificación / QA
- **Playwright** — smoke tests + capturas para QA visual
- **Lighthouse CI** — presupuesto de performance/accesibilidad
- **axe-core** — auditoría a11y automatizada
- **ESLint + `tsc --noEmit`** — calidad de código

---

## 3. Mapeo conceptual: RPG → Secciones del portafolio

| Elemento RPG | Sección real del portafolio | Componente a construir |
|---|---|---|
| Pantalla de selección de personaje | Hero / intro | `CharacterCard` (avatar, "clase" = rol profesional, nivel = años de experiencia) |
| Barras de stats (HP/MP/STR) | Skills técnicos | `StatBar` (proficiency como barra rellenable animada al hacer scroll) |
| Inventario | Stack tecnológico / herramientas | `InventoryGrid` (iconos como "ítems" con tooltip) |
| Quest Log (activas/completadas) | Proyectos | `QuestCard` (dificultad = complejidad, "recompensa" = resultado/impacto, estado = en progreso/completado) |
| Boss battle / jefe final | Proyecto insignia (case study) | `BossEncounter` (sección destacada, más narrativa, con "loot" = resultados medibles) |
| Diálogo de NPC | Bio / testimonios | `DialogueBox` (retrato + texto tipo máquina de escribir) |
| Mapa del mundo | Navegación del sitio | `WorldMap` (nav interactiva, cada "zona" = sección) |
| Árbol de habilidades | Roadmap de aprendizaje / certificaciones | `SkillTree` |
| Punto de guardado | Formulario de contacto | `SavePoint` ("Guarda tu progreso" = enviar mensaje) |
| HUD persistente | Navbar/footer | Toggle de sonido, toggle de "reducir movimiento", indicador de XP scrolleado |

---

## 4. Definición del Loop

### 4.1 Trigger
Instrucción humana directa: *"ejecuta el goal de migración RPG"*. (También podría dispararse por evento: cada PR que toque `/components/portfolio/*`.)

### 4.2 Goal — bloque `/goal`

```
/goal
Título: Migrar portafolio a estructura RPG
Contexto: repo existente del portafolio, contenido real ya disponible (no inventar bios/proyectos)
Estado final verificable:
  - [ ] Build de producción pasa sin errores ni warnings de tipo
  - [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 (mobile y desktop)
  - [ ] Las 10 secciones del mapeo (tabla §3) están migradas y muestran contenido real, no placeholder
  - [ ] 0 errores en consola del navegador en producción
  - [ ] Responsive verificado en 360px / 768px / 1440px (capturas Playwright)
  - [ ] prefers-reduced-motion respetado (animaciones GSAP/Motion se desactivan)
  - [ ] Toggle de sonido funcional y silenciado por defecto
  - [ ] axe-core: 0 violaciones críticas/serias
Presupuesto: 40 iteraciones o 6 horas de cómputo, lo que ocurra primero
Escalamiento: si 3 iteraciones consecutivas no mejoran el resultado de checks o rompen el build, detener y reportar a humano con diff y logs
```

### 4.3 Estado persistente del loop
El agente mantiene (y relee al inicio de cada iteración):
- `PROGRESS.md` — checklist de §4.2 con estado actual
- `design-tokens.json` — paleta, escalas tipográficas, spacing (fuente única de verdad para no re-decidir estilos cada vez)
- `component-inventory.md` — qué componentes RPG ya existen vs. cuáles faltan

### 4.4 Acciones disponibles (tools del agente)
- Leer/escribir archivos del repo
- Ejecutar `npm run build`, `npm run lint`, `tsc --noEmit`
- Ejecutar Playwright (smoke tests + screenshots)
- Ejecutar Lighthouse CI / axe-core
- `git commit` por hito completado (no al final, para poder revertir granularmente)
- Actualizar `PROGRESS.md`

### 4.5 Ciclo de iteración (pseudocódigo)

```
state = load_progress() or init_state(goal)

while not goal_met(state) and budget_remaining():
    task = pick_next_task(state.todo)        # ej: "construir QuestLog component"
    plan = decompose(task)                   # subtareas concretas y acotadas
    diff = implement(plan)                    # crear/editar componentes y estilos
    result = run_checks(diff)                 # build + lint + typecheck + a11y + lighthouse

    if result.passed:
        commit(diff, message=task)
        state.todo.mark_done(task)
    elif result.fixable:
        queue_fix(result.errors)              # vuelve a intentar en la próxima vuelta
    else:
        escalate_to_human(result)
        break

    save_progress(state)
```

### 4.6 Criterios de verificación (Definition of Done)
Idénticos al checklist de §4.2 — el loop NO se considera terminado solo porque "se ve bien"; cada caja debe poder marcarse con un check automatizado, no con juicio subjetivo.

### 4.7 Terminación y escalamiento
- **Éxito**: todas las cajas de §4.2 marcadas → commit final, generar resumen de cambios.
- **Fallo recuperable** (test falla, lint error): se encola como feedback y se reintenta.
- **Fallo fatal** (credencial faltante, dependencia rota, conflicto de arquitectura): escalar a humano inmediatamente, no quemar iteraciones.
- **Estancamiento**: 3 iteraciones sin progreso medible en el checklist → detener y reportar.

---

## 5. Roadmap de fases sugerido

1. **Fase 0 — Auditoría**: inventariar contenido real existente (proyectos, bio, skills) que se va a migrar. No se inventa contenido.
2. **Fase 1 — Fundamentos**: instalar stack, definir `design-tokens.json` (paleta retro + tipografía), layout base tipo HUD.
3. **Fase 2 — Componentes núcleo**: `StatBar`, `DialogueBox`, `QuestCard`, `InventoryGrid`, `WorldMap`.
4. **Fase 3 — Migración de contenido**: volcar el contenido real de Fase 0 dentro de los componentes de Fase 2.
5. **Fase 4 — Animación**: GSAP ScrollTrigger + Lenis + Motion para transiciones.
6. **Fase 5 — QA y pulido**: auditoría a11y, performance, responsive, cross-browser.

---

## 6. Notas de diseño rápidas
- Paleta: inspirarse en paletas de 16/32 colores estilo SNES en vez de gradientes modernos genéricos — da identidad real al "RPG", no solo el nombre.
- Pixel font solo en headers/HUD; texto largo siempre en fuente legible — esto es accesibilidad, no opcional.
- Sonido: opt-in, nunca autoplay con volumen audible por defecto.
- CRT/scanline overlay (si se usa): debe ser un `<div>` con opacidad baja vía CSS, nunca un shader pesado en el critical path.