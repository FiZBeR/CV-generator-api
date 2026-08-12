# CV Generator API

[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-25-40B5A4?logo=puppeteer&logoColor=white)](https://pptr.dev)
[![DeepSeek](https://img.shields.io/badge/IA-DeepSeek-4D6BFE?logo=deepseek&logoColor=white)](https://deepseek.com)

API backend que optimiza hojas de vida con Inteligencia Artificial (DeepSeek) y las exporta como documentos PDF listos para sistemas ATS (Applicant Tracking Systems).

Recibe los datos crudos del candidato y la descripción de una vacante, la IA reescribe el perfil, logros y habilidades para maximizar el *match* con la oferta, y luego un motor de renderizado convierte el resultado en un PDF A4 impecable.

## ✨ Características

- 🧠 **Optimización con IA (DeepSeek):** Prompt engineering especializado en sistemas ATS con reglas estrictas anti-alucinación. Responde únicamente JSON estructurado.
- 📄 **Renderizado de PDF Pixel-Perfect:** Puppeteer genera un PDF A4 exacto, inyectando CSS nativo para un diseño profesional impecable.
- 📚 **Documentación interactiva:** Swagger UI integrado para explorar y probar los endpoints en tiempo real.
- 🧹 **Arquitectura limpia:** Separación clara de responsabilidades (Rutas → Controladores → Servicios → Tipos) con TypeScript estricto de extremo a extremo.

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js 22+ |
| Framework | Express 5 |
| Lenguaje | TypeScript 6 (ESM, modo estricto) |
| IA | DeepSeek API (`deepseek-v4-flash`) vía OpenAI SDK |
| PDF | Puppeteer 25 (Chrome headless) |
| Docs | Swagger UI + OpenAPI 3.0 |
| Dev | `tsx` (recarga automática) |

## 📋 Requisitos Previos

- **Node.js** v22 o superior
- **npm** (incluido con Node.js)
- Una **API Key de DeepSeek** (https://platform.deepseek.com)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cv-generator-api.git
cd cv-generator-api
```

### 2. Instalar dependencias

```bash
npm install
```

> El script `postinstall` descarga automáticamente el navegador Chrome que Puppeteer necesita para generar los PDF.

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3900
DEEPSEEK_API_KEY=tu_clave_de_deepseek
```

| Variable | Descripción | Obligatoria | Valor por defecto |
|----------|-------------|:-----------:|:-----------------:|
| `PORT` | Puerto donde escucha el servidor | No | `3900` |
| `DEEPSEEK_API_KEY` | Clave de API de DeepSeek | **Sí** | — |

### 4. Ejecutar

```bash
npm run dev
```

El servidor arrancará en `http://localhost:3900`.

## 📜 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Modo desarrollo con recarga automática (`tsx watch`) |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta el build de producción (`node dist/index.js`) |
| `postinstall` | Instala el navegador Chrome de Puppeteer |

## 🔌 Endpoints de la API

### Resumen

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/generate-cv` | Genera un CV optimizado con IA |
| `POST` | `/api/download-pdf` | Genera y descarga el CV como PDF |

### 📚 Documentación Swagger

La documentación interactiva de la API está disponible en:

```
http://localhost:3900/api-docs
```

Ahí puedes ver el esquema exacto de cada request, los códigos de respuesta y probar las peticiones en tiempo real.

### `POST /api/generate-cv`

Genera un CV estructurado y optimizado para la vacante objetivo.

**Body (JSON):**

```json
{
  "datos": "Desarrollador Fullstack con 2 años de experiencia en Node.js y React. Conocimientos en PostgreSQL y Docker.",
  "vacante": "Se busca Backend Developer con dominio en TypeScript, Express y arquitecturas limpias."
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `datos` | `string` | Información cruda del candidato (experiencia, educación, habilidades) |
| `vacante` | `string` | Requisitos o descripción de la vacante objetivo |

**Respuesta 200 (JSON):**

```json
{
  "cv": {
    "datosPersonales": { "nombre": "...", "apellidos": "...", "tituloProfesional": "...", "telefono": "...", "email": "...", "linkedin": "..." },
    "aboutMe": "Párrafo persuasivo optimizado para la vacante.",
    "experiencia": [{ "empresa": "...", "puesto": "...", "fechaInicio": "...", "fechaFin": "...", "logros": ["..."], "tecnologias": ["..."] }],
    "proyectos": [{ "nombre": "...", "descripcion": "...", "tecnologias": ["..."], "enlace": "..." }],
    "educacion": [{ "institucion": "...", "titulo": "...", "fechaInicio": "...", "fechaFin": "..." }],
    "idiomas": [{ "nombre": "...", "nivel": "..." }],
    "habilidades": ["...", "...", "..."]
  },
  "message": "CV generado con exito"
}
```

**Errores:**
- `400` — Faltan los datos obligatorios (`datos` y/o `vacante`).
- `500` — Error interno al comunicarse con la IA o procesar la respuesta.

**Ejemplo con cURL:**

```bash
curl -X POST http://localhost:3900/api/generate-cv \
  -H "Content-Type: application/json" \
  -d '{
    "datos": "Desarrollador Fullstack con 2 años de experiencia en Node.js y React.",
    "vacante": "Backend Developer con TypeScript y Express."
  }'
```

### `POST /api/download-pdf`

Convierte un CV estructurado (el resultado de `/generate-cv`) en un PDF A4 descargable.

**Body (JSON):**

```json
{
  "datosPersonales": {
    "nombre": "Juan",
    "apellidos": "Pérez",
    "tituloProfesional": "Ingeniero de Sistemas",
    "telefono": "+57 300 0000000",
    "email": "juan@email.com",
    "linkedin": "https://linkedin.com/in/juanperez"
  },
  "aboutMe": "Desarrollador Backend con experiencia en Node.js y TypeScript...",
  "experiencia": [],
  "proyectos": [],
  "educacion": [],
  "idiomas": [],
  "habilidades": []
}
```

> Requiere al menos `datosPersonales.nombre`. Los demás campos pueden ser arrays vacíos.

**Respuesta 200:** Archivo binario `application/pdf` descargable (`Mi_CV_Profesional.pdf`).

**Errores:**
- `400` — El JSON no tiene la estructura de `HojaDeVida` (falta `datosPersonales.nombre`).
- `500` — Error al renderizar el PDF con Puppeteer.

**Ejemplo con cURL (guardar en archivo):**

```bash
curl -X POST http://localhost:3900/api/download-pdf \
  -H "Content-Type: application/json" \
  -d '{"datosPersonales":{"nombre":"Juan","apellidos":"Pérez","tituloProfesional":"Ingeniero","telefono":"+57 300 0000000","email":"juan@email.com","linkedin":"https://linkedin.com/in/juanperez"},"aboutMe":"Desarrollador backend","experiencia":[],"proyectos":[],"educacion":[],"idiomas":[],"habilidades":[]}' \
  --output Mi_CV_Profesional.pdf
```

## 🗂️ Estructura del Proyecto

```
cv-generator-api/
├── src/
│   ├── index.ts              # Bootstrap del servidor Express (middlewares, rutas, Swagger)
│   ├── config/
│   │   └── swagger.ts        # Configuración de Swagger UI (OpenAPI 3.0)
│   ├── routes/
│   │   └── cv.route.ts       # Definición de rutas
│   ├── controllers/
│   │   └── cv.controller.ts  # Lógica de negocio, validación y respuestas HTTP
│   ├── services/
│   │   ├── ai.service.ts     # Prompt engineering + llamada a la IA (DeepSeek)
│   │   └── pdf.service.ts    # Template HTML/CSS + renderizado PDF (Puppeteer)
│   └── types/
│       └── cv.ts             # Interfaces TypeScript (HojaDeVida y subesquemas)
├── .puppeteerrc.cjs          # Configuración de caché de Puppeteer
├── package.json
├── tsconfig.json             # TypeScript estricto (ESM, NodeNext)
└── README.md
```

## 🚢 Despliegue

Este proyecto está preparado para plataformas tipo **Render** / **Railway**:

- Define las variables de entorno `PORT` y `DEEPSEEK_API_KEY`.
- Build: `npm run build`
- Start: `npm start`
- La instalación de dependencias ejecuta `postinstall`, que descarga Chrome para Puppeteer automáticamente (con `--no-sandbox` configurado en producción).

## 🗺️ Roadmap

- [ ] Validación en runtime del JSON devuelto por la IA (Zod).
- [ ] Reutilización del navegador de Puppeteer entre peticiones.
- [ ] Rate limiting y endurecimiento de CORS.
- [ ] Middleware global de errores y manejo 404.
- [ ] Suite de pruebas automatizadas.

## 📄 Licencia

Este proyecto es de uso personal/portafolio. Uso libre para fines educativos y demostrativos.
