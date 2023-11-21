import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
export const getEmployees = async (req, res) => {};
export const createEmployee = async (req, res) => {
  const {
    nombre,
    fechaNacimiento,
    telefonoContacto,
    correo,
    salario,
    genero,
    password,
    cedula,
  } = req.body;

  try {
    const pHash = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({
      nombre,
      fechaNacimiento,
      telefonoContacto,
      correo,
      salario,
      genero,
      password: pHash,
      cedula,
    });

    const employeeSaved = await newEmployee.save();
    const token = await createAccessToken({ id: employeeSaved._id });

    res.cookie("token", token);
    res.json({
      res,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getEmployee = async (req, res) => {};
export const updateEmployee = async (req, res) => {};
export const deleteEmployee = async (req, res) => {};
