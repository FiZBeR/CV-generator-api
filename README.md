# 🚀 Resume AI (AI CV Generator)

Un generador de Hojas de Vida Fullstack que utiliza Inteligencia Artificial (Gemini) para optimizar perfiles profesionales y convertirlos en documentos PDF listos para sistemas ATS. 

Construí este proyecto para resolver un problema real: hacer que los currículums hagan *match* perfecto con las vacantes, mientras consolido mis habilidades construyendo arquitecturas limpias y experiencias de usuario (UX) modernas.

## ✨ Características Principales

* 🧠 **Optimización con IA:** Conectado a la API de Google Gemini (`@google/genai`) para redactar logros, habilidades y perfiles enfocados en la vacante deseada.
* 📄 **Renderizado de PDF Perfecto:** Uso de Puppeteer en el Backend para generar un PDF exacto al píxel, inyectando CSS nativo para mantener el diseño A4 impecable.
* 🎨 **UX Fluida y Moderna:** * Estados de carga con efectos de "Neón/Passepartout" usando Tailwind avanzado.
    * Manejo de errores silenciosos y notificaciones con `react-hot-toast`.
    * Modales interactivos para guiar al usuario con "Tips Pro".
* 🧹 **Arquitectura Limpia:** Separación clara de responsabilidades (Rutas, Controladores, Servicios) y tipado estricto de extremo a extremo.

## 🛠️ Stack Tecnológico

**Frontend (La Interfaz):**
* React 19 + Vite 8
* TypeScript
* Tailwind CSS (Diseño responsivo y animaciones personalizadas)
* React Hot Toast (Feedback visual)

**Backend (El Motor):**
* Node.js + Express
* TypeScript
* Puppeteer (Generación de PDF headless)
* Google GenAI SDK (Integración con Gemini)
* Swagger (Documentación de API - `swagger-jsdoc` & `swagger-ui-express`)

---

## 🚦 Cómo levantar el proyecto en local

Si quieres clonar esto y probarlo en tu máquina, sigue estos pasos:

### 1. Variables de Entorno
Clona el repositorio y crea un archivo `.env` en el Frontend y otro en el Backend. Necesitarás algo como esto:

**Backend (`.env`):**
```env
PORT=3900
GEMINI_API_KEY=tu_clave_de_google_ai_studio

### 2. Instalacion de Dependencias
Abre tu terminal en esta carpeta y ejecuta:
npm install

### 3. Ejecución
Para levantar el servidor en modo de desarrollo (con recarga automática):

npm run dev

### 4. Documentación de la API (Swagger)
No tienes que adivinar cómo usar los endpoints. Una vez que el servidor esté corriendo, abre tu navegador y entra a:

👉 http://localhost:3000/api-docs

Ahí encontrarás la interfaz interactiva de Swagger donde puedes ver las rutas exactas, la estructura del JSON que espera el body y probar las peticiones en tiempo real.


