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
        /* === VARIABLES Y RESET === */
        :root {
            --primary: #2b66a0;
            --text-black: #000000;
            --text-gray-400: #9ca3af;
            --text-gray-500: #6b7280;
            --text-gray-600: #4b5563;
        }
        
        body { 
            font-family: Georgia, Cambria, "Times New Roman", Times, serif; 
            color: var(--text-black); 
            line-height: 1.625; /* leading-relaxed */
            margin: 0; 
            padding: 0; 
            background-color: white;
        }

        /* === CLASES DE UTILIDAD (Estilo Tailwind) === */
        .text-center { text-align: center; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mr-2 { margin-right: 0.5rem; }
        .ml-4 { margin-left: 1rem; }
        .font-bold { font-weight: bold; }
        .font-light { font-weight: 300; }
        .italic { font-style: italic; }
        .text-justify { text-align: justify; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .items-baseline { align-items: baseline; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .whitespace-nowrap { white-space: nowrap; }

        /* === ESTILOS ESPECÍFICOS DEL CV === */
        /* Header */
        .cv-header h1 { font-size: 28px; line-height: 1.25; margin: 0 0 0.25rem 0; color: var(--text-black); }
        .cv-header h2 { font-size: 15px; color: var(--primary); margin: 0 0 0.25rem 0; font-weight: normal; }
        .contact-row { font-size: 14px; color: var(--primary); display: flex; justify-content: center; flex-wrap: wrap; column-gap: 0.5rem; }
        .contact-sep { color: rgba(43, 102, 160, 0.7); font-weight: 300; }

        /* Secciones */
        .section-title { font-size: 17px; font-weight: bold; color: var(--primary); margin: 0 0 0.25rem 0; }
        hr { border: none; border-top: 1px solid var(--primary); margin: 0 0 0.5rem 0; }
        hr.mb-3 { margin-bottom: 0.75rem; }
        
        .text-body { font-size: 14.5px; }

        /* Items (Experiencia / Educacion) */
        .item-title-block { font-size: 15.5px; line-height: 1.375; margin: 0; }
        .item-dash { color: var(--text-gray-400); font-weight: 300; margin: 0 0.5rem; }
        .item-subtitle { color: var(--text-gray-600); font-style: italic; }
        .item-date { font-size: 14px; color: var(--text-gray-500); }

        /* Listas y Grids */
        ul.logros { list-style-type: square; padding-left: 1.25rem; font-size: 14.5px; margin: 0; }
        ul.logros li { margin-bottom: 0.25rem; text-align: justify; }
        ul.logros::marker { color: black; font-size: 12px; }
        
        .grid-idiomas { display: grid; grid-template-columns: 130px 1fr; column-gap: 0.5rem; row-gap: 0.25rem; font-size: 14.5px; }
    </style>
</head>
<body>
    
    <header class="text-center mb-6 cv-header">
        <h1>${datosCV.datosPersonales.nombre} ${datosCV.datosPersonales.apellidos}</h1>
        <h2>${datosCV.datosPersonales.tituloProfesional}</h2>
        <div class="contact-row">
            ${[
                datosCV.datosPersonales.email, 
                datosCV.datosPersonales.telefono, 
                datosCV.datosPersonales.linkedin
            ].filter(Boolean).map((item, index, arr) => `
                <span>${item}</span>
                ${index < arr.length - 1 ? `<span class="contact-sep">|</span>` : ''}
            `).join('')}
        </div>
    </header>

    ${datosCV.aboutMe ? `
    <section class="mb-6">
        <h2 class="section-title">Perfil Profesional</h2>
        <hr />
        <p class="text-body text-justify m-0">${datosCV.aboutMe}</p>
    </section>
    ` : ''}

    ${datosCV.habilidades && datosCV.habilidades.length > 0 ? `
    <section class="mb-6">
        <h2 class="section-title">Habilidades Técnicas</h2>
        <hr />
        <div class="text-body text-justify">
            <span class="font-bold mr-2">Tecnologías:</span>
            <span>${datosCV.habilidades.join(' • ')}</span>
        </div>
    </section>
    ` : ''}

    ${datosCV.experiencia && datosCV.experiencia.length > 0 ? `
    <section class="mb-6">
        <h2 class="section-title">Experiencia Laboral</h2>
        <hr class="mb-3" />
        <div class="flex flex-col gap-4">
            ${datosCV.experiencia.map(exp => `
            <div>
                <div class="flex justify-between items-baseline mb-1">
                    <h3 class="item-title-block">
                        <span class="font-bold">${exp.puesto}</span>
                        <span class="item-dash">—</span>
                        <span class="item-subtitle">${exp.empresa}</span>
                    </h3>
                    <span class="item-date ml-4 whitespace-nowrap">${exp.fechaInicio} - ${exp.fechaFin}</span>
                </div>
                ${exp.logros && exp.logros.length > 0 ? `
                <ul class="logros">
                    ${exp.logros.map(logro => `<li>${logro}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${datosCV.proyectos && datosCV.proyectos.length > 0 ? `
    <section class="mb-6">
        <h2 class="section-title">Proyectos Destacados</h2>
        <hr class="mb-3" />
        <div class="flex flex-col gap-4">
            ${datosCV.proyectos.map(proy => `
            <div>
                <div class="flex items-baseline mb-1">
                    <h3 class="item-title-block">
                        <span class="font-bold">${proy.nombre}</span>
                        <span class="item-dash">—</span>
                        <span class="item-subtitle">${proy.descripcion}</span>
                    </h3>
                </div>
            </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${datosCV.educacion && datosCV.educacion.length > 0 ? `
    <section class="mb-6">
        <h2 class="section-title">Educación</h2>
        <hr class="mb-3" />
        <div class="flex flex-col gap-2">
            ${datosCV.educacion.map(edu => {
                const fechaTexto = edu.fechaInicio ? `${edu.fechaInicio} - ${edu.fechaFin}` : edu.fechaFin;
                return `
                <div class="flex justify-between items-baseline mb-1">
                    <h3 class="item-title-block">
                        <span class="font-bold">${edu.titulo}</span>
                        <span class="item-dash">—</span>
                        <span class="item-subtitle">${edu.institucion}</span>
                    </h3>
                    ${fechaTexto ? `<span class="item-date ml-4 whitespace-nowrap">${fechaTexto}</span>` : ''}
                </div>
                `;
            }).join('')}
        </div>
    </section>
    ` : ''}

    ${datosCV.idiomas && datosCV.idiomas.length > 0 ? `
    <section class="mb-6">
        <h2 class="section-title">Idiomas</h2>
        <hr />
        <div class="grid-idiomas text-body">
            ${datosCV.idiomas.map(idioma => `
                <span class="font-bold">${idioma.nombre}</span>
                <span>${idioma.nivel}</span>
            `).join('')}
        </div>
    </section>
    ` : ''}

</body>
</html>
`;

        await page.setContent(contenidoHTML, { waitUntil: 'load' });

        const pdfUint8Array = await page.pdf({
            format: 'A4',
            printBackground: true, 
            margin: {
                top: '40px',
                bottom: '40px',
                left: '50px',
                right: '50px'
            }
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