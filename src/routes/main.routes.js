import { Router } from "express";
import { authRequired } from "../middlewares/vaidateToken.js";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
} from "../controllers/employee.controller.js";

const router = Router();

router.get("/employees", authRequired, getEmployees);
router.get("/getEmployee/:cedula", getEmployee);
router.post("/regEmployee", createEmployee);
router.delete("/employee/:cedula", authRequired, deleteEmployee);
router.put("/employee/:cedula", authRequired, updateEmployee);

export default router;
