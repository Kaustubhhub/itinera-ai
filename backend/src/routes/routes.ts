import { Router } from "express";
import { generateIternary, getFlights } from "../controllers/controller";

const router = Router();

router.post("/", generateIternary)
router.get("/", getFlights)

export default router;