import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      default: null,
    },
    telefonoContacto: {
      type: String,
      default: null,
    },
    correo: {
      type: String,
      default: null,
    },
    salario: {
      type: Number,
      default: null,
    },
    genero: {
      type: String,
      default: null,
    },
    cedula: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    departamento: {
      type: String,
      required: true,
    },
    eps: {
      type: String,
      required: true,
    },
    fondoComp: {
      type: String,
      required: true,
    },
    cajaCom: {
      type: String,
      required: true,
    },
    arl: {
      type: String,
      required: true,
    },
    fechaIngreso: {
      type: String,
      required: true,
    },
    certificadoAlturas: {
      type: String,
    },
    cargo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Employee", employeeSchema);
