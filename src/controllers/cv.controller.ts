import { generarCV } from "../services/ai.service.js";
import { Request, Response } from "express";
import { generarPDF } from "../services/pdf.service.js";

export class CvController {

    static async create( req: Request, res: Response): Promise<void> {
        try {
            
            const { datos, vacante } = req.body;

            if(!datos || !vacante){
                res.status(400).json({ error: 'Los datos del usuario y la vacante son obligatorios'});
                return;
            }

            const cvGenerado = await generarCV(datos, vacante);

            if(!cvGenerado){
                res.status(400).json({ error: 'El servidor no respondio'});
                return;
            }

            res.status(200).json({
                cv: cvGenerado,
                message: 'CV generado con exito'
            });

        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
                res.status(500).json({ error: error.message});
            }
        }
    }

    static async downloadPDF(req: Request, res: Response): Promise<void> {
        try {
            
            const cvData = req.body;

            if (!cvData || !cvData.datosPersonales || !cvData.datosPersonales.nombre) {
                res.status(400).json({ error: "El JSON es inválido o no tiene la estructura de HojaDeVida" });
                return;
            }

            const pdfBuffer = await generarPDF(cvData);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="Mi_CV_Profesional.pdf"');

            res.status(200).send(pdfBuffer);
        } catch (error) {
            if( error instanceof Error){
                console.log(error.message);
                res.status(500).json({ error: error.message});
            }
        }
    }
} 