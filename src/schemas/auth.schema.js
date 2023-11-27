import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({ required_error: "el nombre es requerido" }),
  fechaNacimiento: z.string({
    required_error: "la fecha de Nacimiento es requerido",
  }),
  telefonoContacto: z.string({ required_error: "el nombre es requerida" }),
  correo: z
    .string({ required_error: "el correo es requerido" })
    .email({ message: "correo invalido" }),
  salario: z.string({ required_error: "el salario es requerido" }),
  genero: z.string({ required_error: "el genero es requerido" }),
  password: z
    .string({ required_error: "la contraseña es requerida" })
    .min(6, { message: "la contraseña debe ser de almenos 6 caracteres" }),
  cedula: z.string({ required_error: "la cedula es requerida" }),
});

export const loginSchema = z.object({
  password: z
    .string({ required_error: "la contraseña es requerida" })
    .min(6, { message: "la contraseña debe ser de almenos 6 caracteres" }),
  cedula: z.string({ required_error: "la cedula es requerida" }),
});
