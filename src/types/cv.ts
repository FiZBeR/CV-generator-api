
export interface DatosPersonales {
    nombre: string;
    apellidos: string;
    tituloProfesional: string;
    telefono: string;
    email: string;
    linkedin: string;
}

export interface Experiencia {
    empresa: string;
    puesto: string;
    fechaInicio: string;
    fechaFin: string;
    logros: string[];
    tecnologias: string[];
}

export interface Educacion {
    institucion: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
}

export interface Proyecto {
    titulo: string;
    descripcion: string;
    tecnologias: string[];
    enlace: string;
}

export interface Idioma {
    nombre: string;
    nivel: string;
}

export interface HojaDeVida {
    datosPersonales: DatosPersonales;
    aboutMe: string;
    experiencia: Experiencia[];
    proyectos: Proyecto[];
    educacion: Educacion[];
    idiomas: Idioma[];
    habilidades: string[];
}