import { Router } from "express";
import { authRequired } from "../middlewares/vaidateToken";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.controller";

const router = Router();

router.get("/tasks", authRequired, getEmployees);
router.get("/tasks/:id", authRequired, getEmployee);
router.post("/tasks", authRequired, createEmployee);
router.delete("/tasks", authRequired, deleteEmployee);
router.put("/tasks", authRequired, updateEmployee);

export default router;
