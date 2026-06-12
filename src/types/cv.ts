

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