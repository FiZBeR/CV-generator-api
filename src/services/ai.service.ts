import { GoogleGenAI } from '@google/genai';
import { HojaDeVida } from '../types/cv.js';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

export const generarCV = async (datos: string, vacante: string): Promise<HojaDeVida> => {
    try {
        
        const promptCompleto = `
Actúa como un Senior IT Recruiter y experto en sistemas ATS (Applicant Tracking Systems) con más de 10 años de experiencia.

Tu misión es analizar los datos en bruto de un candidato y la descripción de una vacante, y generar un Currículum Vitae altamente optimizado para esa oferta en específico.

REGLAS ESTRICTAS:
1. CERO ALUCINACIONES: Solo puedes basarte en la información proporcionada por el candidato. No inventes tecnologías, años de experiencia, empresas ni títulos que no se hayan mencionado.
2. OPTIMIZACIÓN ATS: Reescribe los logros y el resumen profesional para que hagan "match" con las palabras clave de la vacante, pero manteniendo la honestidad absoluta.
3. FORMATO DE SALIDA: Tu respuesta DEBE ser ÚNICAMENTE un objeto JSON válido. No uses bloques de código Markdown (como \`\`\`json), no saludes, no des feedback. Solo devuelve el JSON puro.

ESTRUCTURA OBLIGATORIA DEL JSON:
{
  "datosPersonales": { "nombre": "", "apellidos": "", "tituloProfesional": "", "telefono": "", "email": "", "linkedin": "" },
  "aboutMe": "Un párrafo persuasivo de máximo 4 líneas optimizado para la vacante",
  "experiencia": [{ "empresa": "", "puesto": "", "fechaInicio": "", "fechaFin": "", "logros": ["Logro 1 adaptado", "Logro 2 adaptado"], "tecnologias": [] }],
  "proyectos": [{ "nombre": "", "descripcion": "", "tecnologias": [], "enlace": "" }],
  "educacion": [{ "institucion": "", "titulo": "", "fechaInicio": "", "fechaFin": "" }],
  "idiomas": [{ "nombre": "", "nivel": "" }],
  "habilidades": ["Keyword 1", "Keyword 2", "Keyword 3"]
}

DATOS DEL CANDIDATO:
${datos}

OFERTA DE TRABAJO (VACANTE):
${vacante}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: promptCompleto,
            config: {
                responseMimeType: "application/json",
            }
        });

        if(!response.text){
            throw new Error("No se genero respuesta por parte del servidor");
        }

        const textoCrudo = response.text;

        const responseClean = textoCrudo
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

        const responseReady = JSON.parse(responseClean);
        console.log(responseReady);

        return responseReady;
        
    } catch (error) {
        
        if(error instanceof Error){
            console.log(error.message);
        }

        throw new Error('Sin respuesta del Servidor');
    }
}