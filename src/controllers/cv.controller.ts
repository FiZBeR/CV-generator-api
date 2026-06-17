import { generarCV } from "../services/ai.service.js";
import { Request, Response } from "express";
import { generarPDF } from "../services/pdf.service.js";

export class CvController {
  /**
   * @openapi
   * /api/cv/generate:
   * post:
   * summary: Generar un CV optimizado con IA
   * description: Genera una Hoja de Vida procesando los datos personales del usuario y la descripción de la vacante objetivo mediante el SDK de Gemini.
   * requestBody:
   * required: true
   * content:
   * application/json:
   * schema:
   * type: object
   * required:
   * - datos
   * - vacante
   * properties:
   * datos:
   * type: object
   * description: Información del usuario (experiencia, educación, habilidades, etc.) que alimentará a la IA.
   * example: { "nombre": "Desarrollador de Ejemplo", "experiencia": "5 años en Node.js y React" }
   * vacante:
   * type: string
   * description: La descripción del puesto o requisitos de la vacante a la que se postula.
   * example: "Se busca Backend Developer con dominio en TypeScript, Express y arquitecturas limpias."
   * responses:
   * 200:
   * description: CV generado con éxito.
   * content:
   * application/json:
   * schema:
   * type: object
   * properties:
   * cv:
   * type: object
   * description: Objeto JSON con la estructura del CV generado y formateado por Gemini.
   * message:
   * type: string
   * example: "CV generado con exito"
   * 400:
   * description: Error en la validación de los datos enviados o fallo en la respuesta de la IA.
   * content:
   * application/json:
   * schema:
   * type: object
   * properties:
   * error:
   * type: string
   * example: "Los datos del usuario y la vacante son obligatorios"
   * 500:
   * description: Error interno del servidor al procesar la solicitud con la IA.
   * content:
   * application/json:
   * schema:
   * type: object
   * properties:
   * error:
   * type: string
   * example: "Mensaje detallado del error interno."
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { datos, vacante } = req.body;

      if (!datos || !vacante) {
        res
          .status(400)
          .json({
            error: "Los datos del usuario y la vacante son obligatorios",
          });
        return;
      }

      const cvGenerado = await generarCV(datos, vacante);

      if (!cvGenerado) {
        res.status(400).json({ error: "El servidor no respondio" });
        return;
      }

      res.status(200).json({
        cv: cvGenerado,
        message: "CV generado con exito",
      });
    } catch (error) {

        if (error instanceof Error) {
            console.error("Error en Gemini:", error.message);

            // Variable por defecto
            let mensajeUsuario =
              "Error interno al generar el CV. Por favor, intenta de nuevo.";
                
            // 1. Detectamos si es por saturación o límite de cuota de Google
            if (
              error.message?.includes("overloaded") ||
              error.message?.includes("503")
            ) {
              mensajeUsuario =
                "Los servidores de IA están saturados en este momento. Por favor, espera un minuto y vuelve a intentar.";
            }
            // 2. Detectamos si es un problema de validación de datos
            else if (
              error.message?.includes("400") ||
              error.name === "GoogleGenerativeAIError"
            ) {
              mensajeUsuario =
                "La IA no pudo procesar los datos enviados. Revisa que la información sea correcta.";
            }
        
            // Enviamos el mensaje traducido al frontend bajo la propiedad "error"
            res.status(500).json({ error: mensajeUsuario});

            return
          }
      
    }
  }

  /**
   * @openapi
   * /api/cv/download:
   * post:
   * summary: Generar y descargar CV en PDF
   * description: Recibe el objeto estructurado de la Hoja de Vida, genera un documento PDF utilizando el servicio correspondiente y lo retorna como un archivo adjunto.
   * requestBody:
   * required: true
   * content:
   * application/json:
   * schema:
   * type: object
   * required:
   * - datosPersonales
   * properties:
   * datosPersonales:
   * type: object
   * required:
   * - nombre
   * properties:
   * nombre:
   * type: string
   * example: "Juan Pérez"
   * example:
   * datosPersonales:
   * nombre: "Juan Pérez"
   * email: "juan.perez@ejemplo.com"
   * experiencia: []
   * responses:
   * 200:
   * description: Archivo PDF generado y retornado correctamente para su descarga.
   * content:
   * application/pdf:
   * schema:
   * type: string
   * format: binary
   * 400:
   * description: El payload JSON recibido es inválido o no cuenta con la estructura obligatoria de HojaDeVida.
   * content:
   * application/json:
   * schema:
   * type: object
   * properties:
   * error:
   * type: string
   * example: "El JSON es inválido o no tiene la estructura de HojaDeVida"
   * 500:
   * description: Error interno del servidor al intentar generar o enviar el buffer del PDF.
   * content:
   * application/json:
   * schema:
   * type: object
   * properties:
   * error:
   * type: string
   * example: "Mensaje detallado del error interno."
   */
  static async downloadPDF(req: Request, res: Response): Promise<void> {
    try {
      const cvData = req.body;

      if (
        !cvData ||
        !cvData.datosPersonales ||
        !cvData.datosPersonales.nombre
      ) {
        res
          .status(400)
          .json({
            error: "El JSON es inválido o no tiene la estructura de HojaDeVida",
          });
        return;
      }

      const pdfBuffer = await generarPDF(cvData);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="Mi_CV_Profesional.pdf"'
      );

      res.status(200).send(pdfBuffer);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
      }
    }
  }
}
