/**
 * @openapi
 * components:
 * schemas:
 * DatosPersonales:
 * type: object
 * required:
 * - nombre
 * - apellidos
 * - tituloProfesional
 * - telefono
 * - email
 * - linkedin
 * properties:
 * nombre:
 * type: string
 * example: "Cristian"
 * apellidos:
 * type: string
 * example: "Campos Velasco"
 * tituloProfesional:
 * type: string
 * example: "Ingeniero de Sistemas"
 * telefono:
 * type: string
 * example: "+57 300 0000000"
 * email:
 * type: string
 * example: "cristian.campos@example.com"
 * linkedin:
 * type: string
 * example: "https://linkedin.com/in/cristiancampos"
 */
export interface DatosPersonales {
    nombre: string;
    apellidos: string;
    tituloProfesional: string;
    telefono: string;
    email: string;
    linkedin: string;
}

/**
 * @openapi
 * components:
 * schemas:
 * Experiencia:
 * type: object
 * required:
 * - empresa
 * - puesto
 * - fechaInicio
 * - fechaFin
 * - logros
 * - tecnologias
 * properties:
 * empresa:
 * type: string
 * example: "Tech Corp"
 * puesto:
 * type: string
 * example: "Desarrollador Backend"
 * fechaInicio:
 * type: string
 * example: "2024-01"
 * fechaFin:
 * type: string
 * example: "Presente"
 * logros:
 * type: array
 * items:
 * type: string
 * example: ["Optimización de consultas en PostgreSQL", "Implementación de CI/CD"]
 * tecnologias:
 * type: array
 * items:
 * type: string
 * example: ["Node.js", "Express", "TypeScript", "Prisma"]
 */
export interface Experiencia {
    empresa: string;
    puesto: string;
    fechaInicio: string;
    fechaFin: string;
    logros: string[];
    tecnologias: string[];
}

/**
 * @openapi
 * components:
 * schemas:
 * Educacion:
 * type: object
 * required:
 * - institucion
 * - titulo
 * - fechaInicio
 * - fechaFin
 * properties:
 * institucion:
 * type: string
 * example: "Universidad XYZ"
 * titulo:
 * type: string
 * example: "Ingeniería de Sistemas"
 * fechaInicio:
 * type: string
 * example: "2021-02"
 * fechaFin:
 * type: string
 * example: "2026-06"
 */
export interface Educacion {
    institucion: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
}

/**
 * @openapi
 * components:
 * schemas:
 * Proyecto:
 * type: object
 * required:
 * - nombre
 * - descripcion
 * - tecnologias
 * - enlace
 * properties:
 * nombre:
 * type: string
 * example: "AI CV Generator"
 * descripcion:
 * type: string
 * example: "Plataforma Fullstack para generar hojas de vida usando el SDK de Gemini."
 * tecnologias:
 * type: array
 * items:
 * type: string
 * example: ["React", "Vite", "Express", "Puppeteer"]
 * enlace:
 * type: string
 * example: "https://github.com/tu-usuario/ai-cv-generator"
 */
export interface Proyecto {
    nombre: string;
    descripcion: string;
    tecnologias: string[];
    enlace: string;
}

/**
 * @openapi
 * components:
 * schemas:
 * Idioma:
 * type: object
 * required:
 * - nombre
 * - nivel
 * properties:
 * nombre:
 * type: string
 * example: "Inglés"
 * nivel:
 * type: string
 * example: "B2 Intermedio"
 */
export interface Idioma {
    nombre: string;
    nivel: string;
}

/**
 * @openapi
 * components:
 * schemas:
 * HojaDeVida:
 * type: object
 * required:
 * - datosPersonales
 * - aboutMe
 * - experiencia
 * - proyectos
 * - educacion
 * - idiomas
 * - habilidades
 * properties:
 * datosPersonales:
 * $ref: '#/components/schemas/DatosPersonales'
 * aboutMe:
 * type: string
 * example: "Estudiante de último semestre de Ingeniería de Sistemas con enfoque en el ecosistema JavaScript/TypeScript..."
 * experiencia:
 * type: array
 * items:
 * $ref: '#/components/schemas/Experiencia'
 * proyectos:
 * type: array
 * items:
 * $ref: '#/components/schemas/Proyecto'
 * educacion:
 * type: array
 * items:
 * $ref: '#/components/schemas/Educacion'
 * idiomas:
 * type: array
 * items:
 * $ref: '#/components/schemas/Idioma'
 * habilidades:
 * type: array
 * items:
 * type: string
 * example: ["Node.js", "Express", "React", "MySQL", "PostgreSQL", "Git"]
 */
export interface HojaDeVida {
    datosPersonales: DatosPersonales;
    aboutMe: string;
    experiencia: Experiencia[];
    proyectos: Proyecto[];
    educacion: Educacion[];
    idiomas: Idioma[];
    habilidades: string[];
}