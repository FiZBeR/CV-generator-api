import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Definimos el objeto de documentación directamente en código puro de TypeScript/JavaScript
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Resume AI API',
    version: '1.0.0',
    description: 'Documentación de la API para la generación y exportación de Hojas de Vida optimizadas con IA.',
  },
  servers: [
    {
      url: 'http://localhost:3900',
      description: 'Servidor de Desarrollo Local',
    },
  ],
  paths: {
    '/generate-cv': {
      post: {
        summary: 'Generar un CV optimizado con IA',
        description: 'Genera una Hoja de Vida procesando los datos personales del usuario y la descripción de la vacante objetivo mediante el SDK de Gemini.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['datos', 'vacante'],
                properties: {
                  datos: {
                    type: 'string',
                    description: 'Información cruda del usuario (experiencia, educación, habilidades).',
                    example: 'Desarrollador Fullstack con 2 años de experiencia en Node.js y React...'
                  },
                  vacante: {
                    type: 'string',
                    description: 'Requisitos de la vacante a la que se postula.',
                    example: 'Se busca Backend Developer con dominio en TypeScript y Express.'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'CV generado con éxito.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    cv: { type: 'object', description: 'Objeto estructurado de la Hoja de Vida.' },
                    message: { type: 'string', example: 'CV generado con éxito' }
                  }
                }
              }
            }
          },
          400: { description: 'Datos obligatorios faltantes.' },
          500: { description: 'Error interno con la API de Gemini.' }
        }
      }
    },
    '/download-pdf': {
      post: {
        summary: 'Generar y descargar CV en PDF',
        description: 'Recibe el objeto estructurado de la Hoja de Vida, genera un documento PDF utilizando Puppeteer y lo retorna como un archivo binario.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['datosPersonales'],
                properties: {
                  datosPersonales: {
                    type: 'object',
                    properties: {
                      nombre: { type: 'string', example: 'Juan Pérez' },
                      email: { type: 'string', example: 'juan@email.com' }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Archivo PDF generado con éxito.',
            content: {
              'application/pdf': {
                schema: { type: 'string', format: 'binary' }
              }
            }
          },
          500: { description: 'Error al renderizar el PDF con Puppeteer.' }
        }
      }
    }
  }
};

export const setupSwagger = (app: Express) => {
  // Le pasamos el objeto directamente a swaggerUi sin pasar por swagger-jsdoc
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
  console.log('📝 Swagger Docs disponibles en http://localhost:3900/api-docs');
};