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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    departamento: {
      type: String,
      required: true,
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
