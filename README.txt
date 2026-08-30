================================================================================
  STRIKING SOLUCIONES INFORMATICAS - DOCUMENTACION DEL PROYECTO
  CV Moderna + Codigo QR + Marca Personal
================================================================================

  Autor:       Patricio Araya Briceño
  Empresa:     Striking Soluciones Informáticas
  URL:         https://patricio-araya.netlify.app
  GitHub:      https://github.com/parayaartificial/plantilla-portafolios
  Fecha:       30 de Agosto, 2026

================================================================================
  1. DESCRIPCIÓN GENERAL
================================================================================

Este proyecto es una Hoja de Vida (CV) digital moderna, responsiva y optimizada
para SEO/ATS, desplegada en Netlify. Incluye la marca personal "Striking" con
logo propio, código QR descargable y diseño dark theme con glassmorphism.

Características principales:
  - Dark theme moderno con glassmorphism
  - Animaciones suaves (scroll, contadores, hover)
  - Código QR generado dinámicamente con logo centrado
  - Descarga de QR como imagen PNG
  - Optimizada para buscadores (JSON-LD Schema.org)
  - Estilos impresos para exportar PDF
  - 100% responsiva (mobile-first)
  - Sin dependencias de backend (estático)

================================================================================
  2. ESTRUCTURA DEL PROYECTO
================================================================================

plantilla-portafolios/
│
├── index.html                 ← Página principal (CV completa)
├── data.json                  ← Datos estructurados (experiencia, proyectos, skills)
│
├── assets/
│   ├── logo.svg               ← Logo de Striking (rayo + texto)
│   └── favicon.svg            ← Favicon del rayo Striking
│
├── css/
│   ├── themes/
│   │   └── default.css        ← Variables de color y tipografía
│   ├── core.css               ← Estilos globales (nav, blobs, botones, print)
│   └── cv.css                 ← Estilos específicos de la CV (hero, timeline, skills, QR)
│
├── js/
│   └── cv.js                  ← Lógica: carga datos, animaciones, QR, schema
│
├── perfiles/                  ← Perfiles individuales (istema CMS)
│   ├── striking-sites.com/    ← Perfil de Patricio (datos completos)
│   ├── carlos-ruiz/           ← Perfil de ejemplo
│   ├── ana-silva/             ← Perfil de ejemplo
│   ├── luis-torres/           ← Perfil de ejemplo
│   ├── maria-gomez/           ← Perfil de ejemplo
│   ├── juan-perez/            ← Perfil de ejemplo
│   └── plantilla_cv/          ← Plantilla base para nuevos perfiles
│
├── admin/                     ← Panel de administración
│   ├── index.html             ← Formulario para crear perfiles
│   └── admin.js               ← Lógica del formulario (envía al Worker)
│
├── admin-worker/              ← Backend serverless (Cloudflare Workers)
│   ├── src/index.js           ← Worker: recibe datos, crea commit en GitHub
│   └── wrangler.toml          ← Configuración del Worker
│
├── database.json              ← Base de datos de perfiles (directorio)
├── .netlify/
│   └── netlify.toml           ← Configuración de Netlify
│
├── setup.ps1                  ← Script de inicialización (PowerShell)
├── update.ps1                 ← Script de actualización de HTMLs
├── fix_all_html.js            ← Fix de encoding HTML (Node.js)
├── fix_encoding.js            ← Fix de encoding data.js (Node.js)
└── README.txt                 ← Este archivo

================================================================================
  3. CONTENIDO DE LA CV
================================================================================

3.1 SECCIONES DE LA PÁGINA
---------------------------

  SECCIÓN              CONTENIDO
  ─────────────────    ──────────────────────────────────────────────
  Hero                 Nombre, título, badge "Disponible", resumen ejecutivo,
                       botones LinkedIn, WhatsApp, Ver QR

  Métricas             4 contadores animados:
                       • 15 Proyectos Desplegados
                       • 25 Tecnologías Dominadas
                       • 5 Países con Experiencia
                       • 10+ Años de Experiencia

  Trayectoria          Timeline vertical con 5 empleos:
  Profesional          • Municipalidad de Concepción (2025-Presente)
                       • Municipalidad de Talcahuano (2025-Presente)
                       • Heligrafics Chile SPA (2019-2025)
                       • Arauco Concepción (2014-2019)
                       • Proyectos Internacionales (2015-2024)

  Proyectos            Grid de 15 proyectos con tech stack:
  Destacados           • Simulador Radial (React, FastAPI, Leaflet)
                       • Informes de Emergencia (Firebase, HTML5)
                       • Registro Incidencias PHP (PHP, MySQL)
                       • Lector GIS (Flask, GeoPandas)
                       • Gestión Flota (Apps Script, Google Sheets)
                       • Transformación DWG (Python, GDAL)
                       • Dashboard Emergencias V2 (Python, CSV)
                       • Resumen Incidencias (Flask, SQLite)
                       • Simulador Radial HTML (HTML5, Leaflet)
                       • Proyecto Actualización Radial (Documentación)
                       • Dashboard COPEC (HTML5, SheetJS)
                       • Fichas Funcionarios (HTML5, Vanilla JS)
                       • Creador Licitaciones (React, Vite)
                       • Presupuesto 2027 (Documentación)
                       • Generador QR (React, Tailwind)

  Arsenal              4 categorías de skills:
  Técnico              • Full-Stack: React, TypeScript, Python, FastAPI, Flask, PHP
                       • GIS: QGIS, GDAL, GeoPandas, Leaflet
                       • Redes: Cisco, Fortinet, Windows Server, Linux
                       • IA: IA Generativa, LiDAR, Videovigilancia

  Código QR            QR dinámico con logo Striking centrado
                       Botón "Descargar QR" (PNG con fondo blanco)

  Contacto             Email, LinkedIn, WhatsApp, Ubicación

  Footer               Logo Striking + tagline + copyright

3.2 TAGLINE DE LA MARCA
------------------------

  "Tecnología que Transforma Operaciones"

================================================================================
  4. MARCA "STRIKING"
================================================================================

4.1 LOGO
--------

  El logo consiste en:
  • Icono: Rayo/destello angular con gradiente azul→púrpura
  • Texto: "STRIKING" en tipografía Outfit Bold
  • Subtexto: "SOLUCIONES INFORMÁTICAS" en Inter Light
  • Colores: #3B82F6 (azul) → #8B5CF6 (púrpura)

  Archivos:
  • assets/logo.svg     → Logo horizontal completo
  • assets/favicon.svg  → Solo el icono del rayo (para favicon)

4.2 PALETA DE COLORES
---------------------

  COLOR           CÓDIGO       USO
  ───────────     ──────────   ──────────────────────────────
  Background      #0B0E14      Fondo principal (dark)
  Surface         rgba(15,23,42,0.6)  Paneles glass
  Primary         #3B82F6      Azul principal (rayo, links)
  Primary Glow    rgba(59,130,246,0.5)  Sombras/brillos
  Secondary       #10B981      Verde (badge disponible)
  Text Main       #F8FAFC      Texto principal
  Text Muted      #94A3B8      Texto secundario
  Border          rgba(255,255,255,0.1)  Bordes sutiles
  Gradient        #3B82F6 → #8B5CF6    Texto gradiente

4.3 TIPOGRAFÍA
--------------

  FUENTE      PESOS                  USO
  ─────────   ────────────────────   ─────────────
  Outfit      400, 600, 800          Títulos, headings
  Inter       300, 400, 500, 600     Cuerpo, navegación

================================================================================
  5. CÓDIGO QR
================================================================================

5.1 GENERACIÓN
--------------

  Librería: qrcodejs v1.0.0 (CDN)
  URL: https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js

  Configuración:
  • Texto: https://patricio-araya.netlify.app
  • Dimensiones: 200x200px
  • Color QR: #1a1a2e (oscuro)
  • Color fondo: #ffffff (blanco)
  • Nivel de corrección: H (alto)
  • Logo centrado: Icono rayo Striking (48x48px)

5.2 DESCARGA
------------

  El botón "Descargar QR" genera un PNG con:
  • Fondo blanco redondeado
  • QR completo
  • Logo Striking centrado
  • Nombre: striking-qr-patricio-araya.png

================================================================================
  6. TECNOLOGÍAS UTILIZADAS
================================================================================

  CATEGORÍA         TECNOLOGÍAS
  ──────────────    ─────────────────────────────────────────
  Frontend          HTML5, CSS3, JavaScript (ES6+)
  Tipografía        Google Fonts (Outfit, Inter)
  QR                qrcodejs v1.0.0
  Hosting           Netlify (deploy estático)
  Backend           Cloudflare Workers (CMS)
  Control VERSION   GitHub
  Diseño            SVG (logo, favicon)
  SEO               JSON-LD Schema.org

================================================================================
  7. DESPLIEGUE
================================================================================

7.1 PROCESO DE DEPLOY
---------------------

  1. git add .
  2. git commit -m "mensaje"
  3. git push origin main
  4. netlify deploy --prod (o deploy automático desde GitHub)

7.2 COMANDO NETLIFY CLI
------------------------

  $env:NETLIFY_AUTH_TOKEN = "token"
  netlify deploy --dir="C:\Users\Patricio\plantilla-portafolios" --site=ID --prod

7.3 VARIABLES DE ENTORNO
-------------------------

  NETLIFY_AUTH_TOKEN    Token de autenticación de Netlify
  GITHUB_TOKEN          Token de GitHub (para admin-worker)

================================================================================
  8. ARCHIVOS CLAVE
================================================================================

8.1 data.json
-------------

  Archivo central con toda la información de la CV.
  Estructura:
  • personal     → Datos personales (nombre, email, teléfono, etc.)
  • branding     → Empresa y tagline
  • metrics      → Números clave (proyectos, skills, países, años)
  • experience   → Array de 5 empleos con highlights y tags
  • projects     → Array de 15 proyectos con tech stack
  • skills       → 4 categorías de habilidades
  • countries    → Países de experiencia

8.2 index.html
--------------

  Página principal con 9 secciones renderizadas por JavaScript.
  Carga: data.json → cv.js → renderiza todo dinámicamente.

8.3 js/cv.js
------------

  Lógica principal:
  • fetch('/data.json') → carga datos
  • Renderiza Hero, Timeline, Projects, Skills, QR, Contact
  • initQR() → genera código QR
  • downloadQR() → descarga QR como PNG
  • animateCounter() → anima métricas
  • initNavigation() → scroll spy + nav activa
  • injectSchema() → inyecta JSON-LD para SEO

================================================================================
  9. SISTEMA CMS (PERFILES)
================================================================================

  El proyecto incluye un sistema de directorio/perfiles:

  • index.html (raíz)     → Directorio de Talento (búsqueda de perfiles)
  • perfiles/{slug}/       → Página individual de cada persona
  • database.json          → Base de datos de perfiles
  • admin/                 → Panel para crear nuevos perfiles
  • admin-worker/          → Backend en Cloudflare Workers

  Flujo del CMS:
  1. Usuario llena formulario en /admin/
  2. admin.js envía datos al Worker de Cloudflare
  3. Worker obtiene plantilla HTML y database.json
  4. Worker crea commit en GitHub con nuevos archivos
  5. Netlify redeploya automáticamente

================================================================================
  10. SOLUCIÓN DE PROBLEMAS
================================================================================

  PROBLEMA                          SOLUCIÓN
  ──────────────────────────────    ──────────────────────────────────
  Contadores en 0                   Verificar data.json y cv.js
  QR no genera                      Verificar CDN de qrcodejs
  Logo no carga                     Verificar ruta /assets/logo.svg
  CSS no aplica                     Verificar carga de default.css
  Fonts no cargan                   Verificar Google Fonts link
  Deploy falla                      Verificar NETLIFY_AUTH_TOKEN
  No hace scroll                    Verificar scroll-padding-top

================================================================================
  11. CONTACTO
================================================================================

  Nombre:     Patricio Araya Briceño
  Empresa:    Striking Soluciones Informáticas
  Email:      patricio.araya.briceno@gmail.com
  Teléfono:   +56 9 7393 3256
  LinkedIn:   https://linkedin.com/in/patricio-araya-briceno
  WhatsApp:   https://wa.me/56973933256
  Ubicación:  Concepción, Chile
  Web:        https://patricio-araya.netlify.app
  GitHub:     https://github.com/parayaartificial/plantilla-portafolios

================================================================================
  © 2026 Patricio Araya Briceño - Striking Soluciones Informáticas
  Tecnología que Transforma Operaciones
================================================================================
