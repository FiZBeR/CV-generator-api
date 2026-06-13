import { Router } from "express";
import { CvController } from "../controllers/cv.controller.js";

const route = Router();

route.post('/generate-cv', CvController.create);
route.post('/download-pdf', CvController.downloadPDF);

export default route;