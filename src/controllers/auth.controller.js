import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const login = async (req, res) => {
  const { password, cedula } = req.body;

  try {
    const employeeFound = await Employee.findOne({ cedula });

    if (!employeeFound) return res.status(400).json(["employee no found"]);

    const isMatch = await bcrypt.compare(password, employeeFound.password);
    if (!isMatch) return res.status(400).json(["incorrect password"]);

    const token = await createAccessToken({ id: employeeFound._id });

    res.cookie("token", token);
    res.json(employeeFound);
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

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await Employee.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      cedula: userFound.cedula,
      correo: userFound.correo,
    });
  });
};
