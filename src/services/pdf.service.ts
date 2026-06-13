import puppeteer from 'puppeteer';
import { HojaDeVida } from '../types/cv.js';

export const generarPDF = async (datosCV: HojaDeVida): Promise<Buffer> => {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });

    try {
        
        const page = await browser.newPage();

        const contenidoHTML = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.5; margin: 0; padding: 0; }
                    .container { max-width: 800px; margin: 0 auto; }
                    
                    /* Encabezado */
                    .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #2c3e50; padding-bottom: 15px; }
                    .header h1 { margin: 0; color: #2c3e50; font-size: 26px; text-transform: uppercase; letter-spacing: 1px; }
                    .header h2 { margin: 5px 0 10px 0; color: #34495e; font-size: 16px; font-weight: normal; }
                    .contact-info { font-size: 12px; color: #555; }
                    .contact-info span { margin: 0 8px; }
                    
                    /* Secciones */
                    .section { margin-bottom: 20px; }
                    .section-title { font-size: 14px; color: #2c3e50; border-bottom: 1px solid #bdc3c7; margin-bottom: 10px; text-transform: uppercase; font-weight: bold; padding-bottom: 3px; }
                    
                    /* Items dinámicos */
                    .item { margin-bottom: 12px; }
                    .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
                    .item-title { font-weight: bold; font-size: 14px; margin: 0; color: #222; }
                    .item-subtitle { font-style: italic; font-size: 13px; color: #555; margin: 0; }
                    .item-date { font-size: 12px; color: #7f8c8d; }
                    .item-desc { font-size: 13px; margin: 4px 0 0 0; text-align: justify; }
                    .tags { font-size: 12px; color: #666; margin-top: 4px; }
                    ul { margin: 5px 0; padding-left: 20px; font-size: 13px; }
                    li { margin-bottom: 3px; text-align: justify; }
                </style>
            </head>
            <body>
                <div class="container">
                    
                    <div class="header">
                        <h1>${datosCV.datosPersonales.nombre} ${datosCV.datosPersonales.apellidos}</h1>
                        <h2>${datosCV.datosPersonales.tituloProfesional}</h2>
                        <div class="contact-info">
                            ${datosCV.datosPersonales.email ? `<span>${datosCV.datosPersonales.email}</span>` : ''}
                            ${datosCV.datosPersonales.telefono ? `<span>| ${datosCV.datosPersonales.telefono}</span>` : ''}
                            ${datosCV.datosPersonales.linkedin ? `<span>| ${datosCV.datosPersonales.linkedin}</span>` : ''}
                        </div>
                    </div>

                    ${datosCV.aboutMe ? `
                    <div class="section">
                        <div class="section-title">Perfil Profesional</div>
                        <p class="item-desc">${datosCV.aboutMe}</p>
                    </div>
                    ` : ''}

                    ${datosCV.experiencia && datosCV.experiencia.length > 0 ? `
                    <div class="section">
                        <div class="section-title">Experiencia Laboral</div>
                        ${datosCV.experiencia.map(exp => `
                        <div class="item">
                            <div class="item-header">
                                <div class="item-title">${exp.puesto} — ${exp.empresa}</div>
                                <div class="item-date">${exp.fechaInicio} - ${exp.fechaFin}</div>
                            </div>
                            <ul>
                                ${exp.logros.map(logro => `<li>${logro}</li>`).join('')}
                            </ul>
                            ${exp.tecnologias && exp.tecnologias.length > 0 ? `<div class="tags"><strong>Stack:</strong> ${exp.tecnologias.join(', ')}</div>` : ''}
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    ${datosCV.proyectos && datosCV.proyectos.length > 0 ? `
                    <div class="section">
                        <div class="section-title">Proyectos Destacados</div>
                        ${datosCV.proyectos.map(proy => `
                        <div class="item">
                            <div class="item-header">
                                <div class="item-title">${proy.titulo}</div>
                            </div>
                            <p class="item-desc">${proy.descripcion}</p>
                            ${proy.tecnologias && proy.tecnologias.length > 0 ? `<div class="tags"><strong>Tecnologías:</strong> ${proy.tecnologias.join(', ')}</div>` : ''}
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    ${datosCV.educacion && datosCV.educacion.length > 0 ? `
                    <div class="section">
                        <div class="section-title">Educación</div>
                        ${datosCV.educacion.map(edu => `
                        <div class="item">
                            <div class="item-header">
                                <div class="item-title">${edu.titulo}</div>
                                <div class="item-date">${edu.fechaInicio} - ${edu.fechaFin}</div>
                            </div>
                            <div class="item-subtitle">${edu.institucion}</div>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}

                    <div class="section">
                        <div class="section-title">Habilidades Adicionales</div>
                        ${datosCV.habilidades && datosCV.habilidades.length > 0 ? `
                        <p class="item-desc"><strong>Técnicas:</strong> ${datosCV.habilidades.join(' • ')}</p>
                        ` : ''}
                        ${datosCV.idiomas && datosCV.idiomas.length > 0 ? `
                        <p class="item-desc" style="margin-top: 4px;"><strong>Idiomas:</strong> ${datosCV.idiomas.map(id => `${id.nombre} (${id.nivel})`).join(' • ')}</p>
                        ` : ''}
                    </div>
                    
                </div>
            </body>
            </html>
        `;

        await page.setContent(contenidoHTML, { waitUntil: 'load' });

        const pdfUint8Array = await page.pdf({
            format: 'A4',
            printBackground: true, 
            margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
        });

        return Buffer.from(pdfUint8Array)
    } catch (error) {

        if(error instanceof Error){
            console.log(error.message);
        }

        throw Error('Error al generar PDF');
    } finally {

        await browser.close();

    }
}