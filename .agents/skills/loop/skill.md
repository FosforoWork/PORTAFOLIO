---
name: loop
description: "Ejecución iterativa controlada. Use ONLY when the user asks to loop, repeat steps, iterate, or says 'vamos paso a paso' / 'step by step' / 'repite hasta' / 'sigue iterando' / 'hazlo N veces'. Also use when the user describes a multi-step task with verification after each step, or when they want to correct/refine something incrementally. Do NOT use for single-step tasks."
---

# Protocolo LOOP

Cuando el usuario active este skill, sigue este flujo:

## Fase 1: Inicialización
1. Pregunta al usuario: **cantidad de pasos** y **objetivo general**.
2. Crea un `todowrite` con N ítems: `Paso 1/N`, `Paso 2/N`, ..., `Paso N/N`.
3. Marca el primer paso como `in_progress`.

## Fase 2: Ejecución por Paso
Para cada paso `i` de `1..N`:
1. Pregunta: **"¿Qué necesitas que haga en el paso `i`/`N`?"**
2. Espera la respuesta y ejecuta las acciones indicadas.
3. Al terminar, pregunta: **"¿Confirmas que este paso está correcto?"**
4. SI el usuario dice que no → corrige y no avances.
5. SI el usuario dice que sí → marca paso `i` como `completed`.
6. Muestra progreso: `[i/N]` y un breve resumen de lo ejecutado.

## Fase 3: Verificación Final
Al completar el paso N:
1. SI el objetivo se cumplió → marca todo `completed`, muestra resumen final.
2. SI NO → pregunta: **"¿Qué pasos adicionales necesitas?"** y reinicia desde Fase 1.

## Reglas
- Un paso a la vez. No ejecutes varios sin preguntar.
- Si el usuario dice "para" o "detente", pausa y pregunta cómo seguir.
- Usa el script `Loop/loop.ps1` para trackear estado si es útil.
- Al final de cada paso, da un breve resumen de lo que hiciste.
