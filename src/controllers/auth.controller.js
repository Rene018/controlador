import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
export const register = async (req, res) => {
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
      employeeSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { password, cedula } = req.body;

  try {
    const employeeFound = await Employee.findOne({ cedula });

    if (!employeeFound)
      return res.status(400).json({ message: "employee no found" });

    const isMatch = await bcrypt.compare(password, employeeFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });

    const token = await createAccessToken({ id: employeeFound._id });

    res.cookie("token", token);
    res.json({
      message: "employee created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const employeeFound = await Employee.findById(req.user.id);

  if (!employeeFound) return res.status(400).json({ message: "User no found" });
  res.send(employeeFound);
};
