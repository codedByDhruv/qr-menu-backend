import express from "express";
import upload from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { createQR, getPublicQR, getQR, getQRImage } from "../controllers/qr.controller.js";

const router = express.Router();

router.post("/create", protect, upload.single("file"), createQR);
router.get("/", protect, getQR);
router.get("/image/:slug", getQRImage);
router.get("/public/:slug", getPublicQR);

export default router;
