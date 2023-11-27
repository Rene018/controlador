import { Router } from "express";
import {
  createDocument,
  dowloadDoc,
} from "../controllers/document.controller.js";
import { authRequired } from "../middlewares/vaidateToken.js";
import upload from "../middlewares/upDocument.js";
const router = Router();

router.post("/createDoc", upload.single("prub"), createDocument);
router.get("/dowloadDoc/:id", authRequired, dowloadDoc);
export default router;
