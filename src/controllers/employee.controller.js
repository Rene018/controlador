import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
export const getEmployees = async (req, res) => {
  const Employees = await Employee.aggregate([
    {
      $lookup: {
        from: "documents",
        localField: "cedula",
        foreignField: "cedula",
        as: "documentos",
      },
    },
  ]);

  res.json(Employees);
};
export const getEmployee = async (req, res) => {
  const { cedula } = req.params;
  const employee = await Employee.aggregate([
    {
      $lookup: {
        from: "documents",
        localField: "cedula",
        foreignField: "cedula",
        as: "documentos",
      },
    },
  ]);
  const employeeFound = employee.filter((en) => en.cedula == cedula);
  res.json(employeeFound);
};
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
    cargo,
    departamento,
  } = req.body;

  try {
    const employeeFound = await Employee.findOne({ cedula });
    if (employeeFound) return res.status(400).json(["la cedula ya existe"]);

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
      cargo,
      departamento,
    });

    const employeeSaved = await newEmployee.save();
    res.json({
      employeeSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateEmployee = async (req, res) => {
  const employeeFound = await Employee.findOneAndUpdate({
    cedula: req.params.cedula,
  });
  if (!employeeFound)
    return res.status(404).json({ message: "employee no found" });

  res.json(employeeFound);
};
export const deleteEmployee = async (req, res) => {
  const employeeFound = await Employee.findOneAndDelete({
    cedula: req.params.cedula,
  });
  if (!employeeFound)
    return res.status(404).json({ message: "employee no found" });

  return res.sendStatus(404);
};
