# REFERENCIAS.md — Guía Visual y Directrices de Inspiración

Este documento establece los parámetros de extracción estética para las referencias visuales de **LOGIKA LAB**. Cada referencia se analiza quirúrgicamente: se extrae únicamente lo que potencia el rigor técnico y se prohíbe explícitamente lo que desvíe la identidad de marca.

---

## Jerarquía de Reglas (Resolución de Conflictos)
1. **La identidad de marca de `.impeccable.md` manda siempre**: No se alteran colores (`#1154FF` acento, `#01040F` fondo, `#FFFFFF` titulares, `#D9D9D9` cuerpo) ni tipografía (`Open Sauce Sans`) bajo ninguna recomendación externa.
2. **Impeccable**: Define lo que **NO** se debe hacer (anti-patrones, clichés de IA, bordes genéricos, sombras sucias, modales invasivos).
3. **Taste Skill**: Gobierna la **calidad visual, la arquitectura de componentes de doble bisel (doppelrand), el espaciado y la cinemática de movimiento**.
4. **UI/UX Pro Max**: Se consulta exclusivamente para **patrones de conversión B2B, contraste accesible (WCAG AA), navegación por teclado y ergonomía táctil (44x44px)**. Se descartan sus paletas cromáticas y tipografías sugeridas.

---

## Matriz de Referencias Estéticas

### 1. Linear.app (El Estándar de Precisión)
- **QUÉ SE TOMA**:
  - Micro-bordes de precisión milimétrica (`border-white/10` con efecto hairline).
  - Efectos de foco dinámico (*card spotlight*) que siguen las coordenadas del cursor.
  - Indicadores monocromáticos de estado y terminales con sintaxis técnica (`// 01.`, `>_`).
  - Ritmo espacial generoso (`py-24` a `py-32`) que transmite orden y tranquilidad mental al tomador de decisiones.
- **QUÉ NO SE TOMA**:
  - Tonos púrpura o gradientes pastel ajenos a la marca.
  - Modales o capas de navegación saturadas que compliquen el flujo de contacto rápido.
  - Densidad excesiva de datos de tablero que abrume al perfil directivo de 45 años.

### 2. Stripe / Vercel (Claridad y Tipografía)
- **QUÉ SE TOMA**:
  - Titulares display monumentales con kerning cerrado y legibilidad impecable.
  - Bento grids asimétricos con jerarquía evidente: las funciones críticas ocupan el 60% del ancho.
  - Animación suave de entrada con desplazamiento vertical y fade progresivo (`whileInView`).
- **QUÉ NO SE TOMA**:
  - Fondos claros o esquemas de color claros que diluyan la personalidad técnica nocturna.
  - Ilustraciones 3D de personajes o caricaturas estilo corporate Memphis.
  - Textos comerciales genéricos ("Soluciones 360", "Transformación digital").

### 3. Resend / Raycast (Elegancia Minimalista para Desarrolladores)
- **QUÉ SE TOMA**:
  - El contraste absoluto entre negro profundo y blanco puro, con un único color de acento vibrante (`#1154FF`).
  - Tarjetas con arquitectura de doble contenedor (cáscara exterior pulida + núcleo interior con relieve sutil).
  - Botones con píldora contenedora de icono interno para acentuar el dinamismo de acción.
- **QUÉ NO SE TOMA**:
  - Minimalismo estéril que carezca de energía o que parezca un wireframe inacabado.
  - Animaciones infinitas o rebotes exagerados que distraigan de los llamados a la acción (WhatsApp y diagnóstico).

---

## Bitácora de Nuevas Referencias (Para imágenes que el usuario adjunte)
*Cuando el usuario agregue capturas o imágenes en `/referencias`, registrar aquí:*
- **Referencia [ID/Nombre]**:
  - **Ubicación de archivo**: `/referencias/nombre-archivo.ext`
  - **Elemento específico que se toma**: [Espaciado / Hero / Tipografía / Animación / Microinteracción]
  - **Elemento que se prohíbe / NO se toma**: [Paleta ajena / Estilo recargado / Elemento decorativo innecesario]
